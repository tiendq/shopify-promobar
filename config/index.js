require('dotenv-safe');

const development = require('./development');
const production = require('./production');
const staging = require('./staging');

let config = null;

if ('development' === process.env.NODE_ENV)
  config = development;
else if ('staging' === process.env.NODE_ENV)
  config = staging;
else
  config = production;

config.mongodb.url = process.env.DB_URL;
config.shopify.apiKey = process.env.SHOPIFY_API_KEY;
config.shopify.apiSecretKey = process.env.SHOPIFY_SECRET_KEY;

module.exports = config;
