module.exports = {
  cookieSecret: 'SECRET_GOES_HERE',
  port: process.env.PORT,
  mongodb: {
    url: 'mongodb://USERNAME:PASSWORD@SERVER:27017/promobar',
    poolSize: 25
  },
  shopify: {
    apiKey: 'APIKEY',
    apiSecretKey: 'API_SECRET',
    scope: 'write_script_tags,write_themes'
  },

  // Browser session cookie in milliseconds.
  sessionMaxAge: 25 * 60 * 1000,
  logFile: '/var/log/spb/winston.log',

  // Provide a max-age in milliseconds for static files caching.
  // This can also be a string accepted by the ms module.
  staticMaxAge: '30d',
  url: 'https://example.com',
  revision: 'REVISION'
}
