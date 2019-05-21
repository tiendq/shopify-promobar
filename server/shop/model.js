let logger = require('../logger');
let config = require('../../config');
let { scriptTag } = require('../shopify-connector');
let { createUninstallWebhook } = require('../shopify/webhooks');
let shopData = require('./data');
let promo = require('../promo/promo');
let promoData = require('../promo/data');

async function setupNewShop(name, token) {
  let shop = await findShopByName(name);
  let uninstallWebhookUrl = `${config.url}/webhooks/uninstall`;

  if (shop) {
    let renewedShop = await renewInstalledShop(shop, token);

    if (renewedShop) {
      await installScriptTag(renewedShop);
      await createUninstallWebhook(renewedShop, uninstallWebhookUrl);
      return renewedShop;
    }
  } else {
    let createdShopId = await createShop(name, token);

    if (createdShopId) {
      shop = await findShopById(createdShopId);

      if (shop) {
        await promo.createEmptyPromo(shop.id);
        await installScriptTag(shop);
        await createUninstallWebhook(shop, uninstallWebhookUrl);

        return shop;
      }
    }

    return null;
  }
}

async function renewInstalledShop(shop, token) {
  let renewedShop = {
    ...shop,
    accessToken: token.access_token,
    accessScope: token.scope,
    installCount: shop.installCount + 1,
    installedDate: new Date(),
    lastModifiedDate: new Date()
  };

  let success = await shopData.updateRenewedShop(renewedShop);

  if (success) {
    logger.info(`Renewed shop ${renewedShop.name}`);

    success = await promoData.resetPromo(shop.id);

    if (success)
      return renewedShop;
  }

  return null;
}

async function createShop(name, token) {
  let shop = {
    name,
    accessToken: token.access_token,
    accessScope: token.scope,
    installCount: 1,
    installedDate: new Date(),
    createdDate: new Date(),
    lastModifiedDate: new Date()
  };

  let createdShopId = await shopData.createShop(shop);

  if (createdShopId)
    logger.info(`Created a new shop ${shop.name} ${createdShopId}`);

  return createdShopId;
}

async function findShopByName(name) {
  let shop = await shopData.findShopByName(name);

  if (!shop)
    return null;

  if (shop && !shop._id) {
    logger.info(`Shop ${name} not found`);
    return shop;
  }

  let foundShop = {
    ...shop,
    id: shop._id.toHexString()
  };

  return foundShop;
}

async function findShopById(id) {
  let shop = await shopData.findShopById(id);

  if (!shop)
    return null;

  if (shop && !shop._id) {
    logger.info(`Shop ${id} not found`);
    return shop;
  }

  let foundShop = {
    ...shop,
    id: shop._id.toHexString()
  };

  return foundShop;
}

async function installScriptTag(shop) {
  let script = `${config.url}/lib/loader.${shop.id}.js`;

  try {
    let response = await scriptTag.list(shop);

    if (200 !== response.statusCode) {
      logger.info(`Could not check script for shop ${shop.name}`);
      return '';
    }

    if (0 !== response.body.script_tags.length) {
      logger.info(`Script already created for shop ${shop.name}`);
      return response.body.script_tags[0].id;
    }

    response = await scriptTag.add(shop, script);

    if (201 === response.statusCode)
      logger.info(`Added script ${response.body.script_tag.id} for shop ${shop.name}`);
    else
      logger.log('warn', `Could not add script for shop ${shop.name}`, response.body.errors);

    return 201 === response.statusCode ? response.body.script_tag.id : '';
  } catch (error) {
    logger.log('error', `Failed to add script for shop ${shop.name}`, error);
    return '';
  }
}

async function removeApp(name) {
  try {
    await shopData.removeApp(name);
  } catch (error) { // eslint-disable-line no-unused-vars
  }
}

module.exports = {
  setupNewShop,
  findShopById,
  findShopByName,
  removeApp
};
