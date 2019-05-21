let uuid = require('uuid/v1');
let logger = require('../logger');
let config = require('../../config');
let shopifyOAuthUtils = require('./shopify-oauth-utils');

const OAUTH_STATE_COOKIE = 'oauthState';

function requestOAuth(request, response) {
  logger.info(`Requesting to OAuth app on ${request.query.shop}`);

  let state = uuid(),
    oauthRedirectUrl = `${config.url}/shopify/approved-oauth`,
    oauthUrl = `https://${request.query.shop}/admin/oauth/authorize?client_id=${config.shopify.apiKey}&scope=${config.shopify.scope}&state=${state}&redirect_uri=${oauthRedirectUrl}`;

  response.cookie(OAUTH_STATE_COOKIE, state, {
    maxAge: 30000,
    httpOnly: true,
    signed: true,
    secure: 'development' !== process.env.NODE_ENV
  });

  // https://help.shopify.com/api/sdks/shopify-apps/embedded-app-sdk/getting-started
  response.render('home/escape-iframe', {
    layout: false,
    targetOrigin: `https://${request.query.shop}`,
    oauthUrl
  });
}

async function handleApprovedOAuth(request) {
  let { code, shop } = request.query;

  logger.info(`OAuth app on ${shop} is approved`);

  try {
    let token = await shopifyOAuthUtils.requestAccessToken(shop, code, config.shopify.apiKey, config.shopify.apiSecretKey);
    return token;
  } catch (error) {
    logger.log('error', `Could not exchange for permanent access token of ${shop}`, error);
    throw error;
  }
}

module.exports = {
  requestOAuth,
  handleApprovedOAuth
};
