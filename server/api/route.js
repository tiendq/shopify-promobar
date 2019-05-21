let router = require('express').Router();
let promo = require('./promo');
let maxAge = 'development' === process.env.NODE_ENV ? 1 : 15; // in seconds

router.get('*', (request, response, next) => {
  response.set({
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': `public, max-age=${maxAge}`
  });

  next();
});

router.get('/promo', (request, response) => {
  promo.findPromoByShopId(request, response);
});

module.exports = router;
