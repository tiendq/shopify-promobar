let router = require('express').Router();
let bodyParser = require('body-parser');
let webhook = require('./webhook');

router.all('*', (request, response, next) => {
  response.set({
    'Access-Control-Allow-Origin': '*'
  });

  next();
});

// Get raw body sent by Shopify although it's JSON data.
router.post('/uninstall', bodyParser.text({ type: 'application/json' }), (request, response) => {
  webhook.handleUninstalledEvent(request, response);
});

module.exports = router;
