let router = require('express').Router();
let jsonParser = require('body-parser').json();
let promo = require('./promo');

router.all('*', (request, response, next) => {
  if (request.session.shop)
    next();
  else
    response.sendStatus(401);
});

router.get('/edit', (request, response) => {
  promo.editPromo(request, response);
});

router.post('/edit', jsonParser, (request, response) => {
  promo.savePromo(request, response);
});

module.exports = router;
