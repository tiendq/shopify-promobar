module.exports = {
  cookieSecret: 'staging',
  port: process.env.PORT,
  mongodb: {
    url: 'mongodb://web:staging@localhost:27017/stickypromobar_staging',
    poolSize: 25
  },
  shopify: {
    apiKey: '',
    apiSecretKey: '',
    scope: 'write_script_tags,write_themes'
  },

  // Browser session cookie in milliseconds.
  sessionMaxAge: 25 * 60 * 1000,
  logFile: '/var/log/stickypromobar/winston_staging.log',

  // Provide a max-age in milliseconds for static files caching.
  // This can also be a string accepted by the ms module.
  staticMaxAge: '30d',
  url: 'https://4ee4a9f4.ngrok.io',
  revision: '1234abcd'
}
