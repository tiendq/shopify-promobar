let router = require('express').Router();
let shopify = require('./shopify');

/*
Entry route to handle initial requests/redirects from Shopify, including:
?hmac=c32bb062790bb8361a1297dc8721cff5185d17786b8edc8ab8df28d0018eb414&locale=en&protocol=https%3A%2F%2F&shop=test-store.myshopify.com&timestamp=1509427819

- Install request:
  /shopify/?shop=test-store.myshopify.com

- Open installed app from shop admin:
  /shopify?hmac=9af355271ae9a03e3bd559a97bb7eaacb9cfa796b7e326e7f9bad6ccf9c9021c
  &locale=en
  &protocol=https%3A%2F%2F
  &shop=test-store.myshopify.com
  &timestamp=1508757546
*/
router.get('/', (request, response) => {
  shopify.handleShopifyRedirects(request, response);
});

/*
User has approved OAuth/install request, perform initial works for newly installation:
  /shopify/approved-oauth?code=9c772995106b647b4f1be07ae01a442b
  &hmac=880b6a7b1848b0fdc117701323952c46cf3f39361233998627b67fdb46f88862
  &shop=test-store.myshopify.com
  &state=b3cb27a0-b7c7-11e7-9e85-d99daf7120c6
  &timestamp=1508745428
*/
router.get('/approved-oauth', (request, response) => {
  shopify.handleApprovedOAuth(request, response);
});

module.exports = router;
