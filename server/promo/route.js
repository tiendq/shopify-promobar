const express = require('express');
const promo = require('./promo');

let router = express.Router();

router.all('*', (request, response, next) => {
  if (request.session.shop)
    next();
  else
    response.sendStatus(401);
});

router.get('/edit', (request, response) => {
  promo.editPromo(request, response);
});

router.post('/edit', express.json(), (request, response) => {
  promo.savePromo(request, response);
});

module.exports = router;
