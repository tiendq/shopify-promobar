let config = require('../../config');
let promoModel = require('./model');
let { DEFAULT_PROMO } = require('./const');

async function editPromo(request, response) {
  try {
    let promo = await promoModel.findPromoByShopId(request.session.shop.id);
    let json = 0; // not found

    if (promo) {
      // eslint-disable-next-line no-unused-vars
      let { _id, shopId, createdDate, lastModifiedDate, ...rest } = promo;
      json = JSON.stringify(rest);
    }

    response.render('promo/edit', {
      apiKey: config.shopify.apiKey,
      shopName: request.session.shop.name,
      promo: json,
      welcome: '1' === request.query.welcome
    });
  } catch (error) { // eslint-disable-line no-unused-vars
    response.sendStatus(500);
  }
}

// Update changes on promo, create new object if necessary.
// Return newly created object ID if promo doesn't exist.
function savePromo(request, response) {
  let formData = {
    ...request.body,
    shopId: request.session.shop.id
  };

  promoModel.savePromo(formData)
    .then(createdPromoId => {
      if (createdPromoId && !formData.id)
        response.status(200).json({ id: createdPromoId });
      else
        response.status(200).json({});
    })
    .catch(error => response.sendStatus(500)); // eslint-disable-line no-unused-vars
}

async function createEmptyPromo(shopId) {
  let promo = {
    shopId,
    ...DEFAULT_PROMO
  };

  return await promoModel.savePromo(promo);
}

module.exports = {
  editPromo,
  savePromo,
  createEmptyPromo
};
