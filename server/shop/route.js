let router = require('express').Router();
let shop = require('./shop');

router.all('*', (request, response, next) => {
  if (request.session.shop)
    next();
  else
    response.sendStatus(401);
});

router.get('/support', (request, response) => {
  shop.showSupportPage(request, response);
});

module.exports = router;
