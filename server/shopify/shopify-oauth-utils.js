let crypto = require('crypto');
let qs = require('qs');
let requestPromise = require('request-promise-native');

// https://help.shopify.com/api/getting-started/authentication/oauth
// Ensure the provided hostname parameter is a valid hostname, ends with myshopify.com,
// and does not contain characters other than letters (a-z), numbers (0-9), dots, and hyphens.
function isHostNameValid(hostName) {
  let pattern = /^[a-z\d-]+.myshopify.com$/i;
  return hostName && pattern.test(hostName);
}

// Extract shop name from host name if have to, e.g. test-store.myshopify.com
function getShopName(hostName) {
  let dot = hostName.indexOf('.');
  return -1 !== dot ? hostName.substring(0, dot) : hostName;
}

// Check if provided HMAC parameter is equal to self generated from secret key.
function isHMACValid(secret, queryString) {
  let { hmac, ...rest } = queryString;

  // Output string should not base64 encoded, or you get wrong hash.
  // https://ecommerce.shopify.com/c/shopify-apis-and-technology/t/hmac-verification-issues-round-2-380922
  let message = qs.stringify(rest, { encode: false });
  let generatedHash = crypto.createHmac('sha256', secret).update(message).digest('hex');

  return hmac === generatedHash;
}

// body is an UTF-8 string, it's raw body sent by Shopify.
// https://gist.github.com/andjosh/5c4f0244914adfd312e4
function getWebhookHMAC(secret, body) {
  let generatedHash = crypto.createHmac('sha256', secret).update(Buffer.from(body)).digest('base64');
  return generatedHash;
}

// Exchange temporary code for a permanent access token.
function requestAccessToken(shop, code, apiKey, apiSecretKey) {
  let options = {
    method: 'POST',
    url: `https://${shop}/admin/oauth/access_token`,
    json: true,
    body: {
      code,
      client_id: apiKey,
      client_secret: apiSecretKey
    }
  };

  return requestPromise(options).then(response => response);
}

module.exports = {
  getShopName,
  isHMACValid,
  getWebhookHMAC,
  isHostNameValid,
  requestAccessToken
};
