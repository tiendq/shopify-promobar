module.exports = {
  cookieSecret: 'development',
  port: process.env.PORT,
  mongodb: {
    url: 'mongodb://localhost:57017/promobar',
    poolSize: 1
  },
  shopify: {
    apiKey: '',
    apiSecretKey: '',
    scope: 'write_script_tags,write_themes'
  },

  // Browser session cookie in milliseconds.
  sessionMaxAge: 30 * 60 * 1000,
  logFile: '/var/log/promobar/winston.log',

  // Provide a max-age in milliseconds for static files caching.
  // This can also be a string accepted by the ms module.
  staticMaxAge: 1000,
  url: 'https://87ecb42a.ngrok.io',
  revision: '1234abcd'
}
