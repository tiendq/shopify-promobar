let config = require('../../config');
let logger = require('../logger');
let shopifyOAuthUtils = require('../shopify/shopify-oauth-utils');
let shopModel = require('../shop/model');

function handleUninstalledEvent(request, response) {
  let topic = request.get('X-Shopify-Topic');
  let hmac = request.get('X-Shopify-Hmac-Sha256');
  let shop = request.get('X-Shopify-Shop-Domain');

  // Quickly acknowledge received event first and defer all further processing.
  setTimeout(processUninstalledEvent, 0, topic, hmac, shop, request.body);

  response.sendStatus(200);
}

function processUninstalledEvent(topic, hmac, shop, body) {
  logger.info(`Received ${topic} event from ${shop}`);

  if (!topic ||!hmac || !shop) {
    logger.warn('Missing required header information');
    return false;
  }

  if (hmac !== shopifyOAuthUtils.getWebhookHMAC(config.shopify.apiSecretKey, body)) {
    logger.warn('HMAC is invalid');
    return false;
  }

  shopModel.removeApp(shopifyOAuthUtils.getShopName(shop));
}

module.exports = {
  handleUninstalledEvent
};
