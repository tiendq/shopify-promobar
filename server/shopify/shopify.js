let config = require('../../config');
let logger = require('../logger');
let shopModel = require('../shop/model');
let shopifyOAuth = require('./shopify-oauth');
let shopifyOAuthUtils = require('./shopify-oauth-utils');

function handleShopifyRedirects(request, response) {
  if (!shopifyOAuthUtils.isHostNameValid(request.query.shop))
    return response.sendStatus(400);

  // Only ignore HMAC parameter in development where it's not available
  // for the first time testing install request.
  let ignoreHMAC = !request.query.hmac && 'development' === process.env.NODE_ENV;

  if (!ignoreHMAC && !shopifyOAuthUtils.isHMACValid(config.shopify.apiSecretKey, request.query)) {
    logger.log('warn', `${request.query.shop} sent with an invalid HMAC`, request.query);
    return response.sendStatus(400);
  }

  // Reset session every time get redirected request from Shopify.
  request.session.shop = null;

  let shopName = shopifyOAuthUtils.getShopName(request.query.shop);

  // PENDING: Check shop ID cookie to prevent crossing shop sessions issue.
  // Issue #23: since session cookie is based on app domain, not shop domain, then an active
  // session could be unauthorized access from other shop in a same browser.
  // if (request.session.shop && request.session.shop.id === request.signedCookies.shopId)
  //  return response.redirect('/promo/edit');

  shopModel.findShopByName(shopifyOAuthUtils.getShopName(shopName))
    .then(shop => {
      if (shop && shop.accessToken)
        initNewSession(shop, request, response);
      else
        shopifyOAuth.requestOAuth(request, response);
    })
    .catch(error => response.sendStatus(500)); // eslint-disable-line no-unused-vars
}

async function handleApprovedOAuth(request, response) {
  let { code, hmac, shop, state } = request.query;

  if (!code || !hmac || !shop || !state)
    return response.sendStatus(400);

  if (state !== request.signedCookies.oauthState)
    return response.sendStatus(400);

  if (!shopifyOAuthUtils.isHMACValid(config.shopify.apiSecretKey, request.query)) {
    logger.log('warn', `${request.query.shop} sent with an invalid HMAC`, request.query);
    return response.sendStatus(400);
  }

  try {
    let token = await shopifyOAuth.handleApprovedOAuth(request);

    if (token) {
      logger.info(`Got access token for shop ${shop}`);

      let createdShop = await shopModel.setupNewShop(shopifyOAuthUtils.getShopName(shop), token);

      if (createdShop)
        initNewSession(createdShop, request, response, true);
    }
  } catch (error) {
    logger.error(`Failed to setup new shop ${shop}`, error);
    response.sendStatus(500);
  }
}

// Initiate a new session with necessary, redirect to start screen which user will see
// when clicked on the app name in the shop admin area.
function initNewSession(shop, request, response, isFirstTime) {
  let { id, name, accessToken } = shop;

  request.session.shop = {
    id,
    name,
    accessToken
  };

  // Cookie to prevent session from crossing shop access issue.
  /*response.cookie('shopId', id, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    signed: true,
    secure: 'production' === process.env.NODE_ENV
  });*/

  logger.info(`Initialized new session for shop ${name} (${id})`);
  response.redirect(isFirstTime ? '/promo/edit?welcome=1' : '/promo/edit');
}

module.exports = {
  handleShopifyRedirects,
  handleApprovedOAuth
};
