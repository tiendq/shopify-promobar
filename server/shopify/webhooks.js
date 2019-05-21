let logger = require('../logger');
let { webhook } = require('../shopify-connector');

async function createUninstallWebhook(shop, url) {
  try {
    let response = await webhook.list(shop, 'app/uninstalled');

    if (200 !== response.statusCode) {
      logger.info(`Could not check uninstall webhook for shop ${shop.name}`);
      return 0;
    }

    if (0 !== response.body.webhooks.length) {
      logger.info(`Uninstall webhook already created for shop ${shop.name}`);
      return response.body.webhooks[0].id;
    }

    response = await webhook.add(shop, 'app/uninstalled', url);

    if (201 === response.statusCode) {
      logger.info(`Created uninstall webhook ${response.body.webhook.id} for shop ${shop.name}`);
      return response.body.webhook.id;
    } else {
      logger.log('warn', `Could not create uninstall webhook for shop ${shop.name}`, response.body.errors);
      return 0;
    }
  } catch (error) {
    logger.log('error', `Failed to create uninstall webhook for shop ${shop.name}`, error);
    return 0;
  }
}

module.exports = {
  createUninstallWebhook
};
