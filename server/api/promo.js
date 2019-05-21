let promoModel = require('../promo/model');

async function findPromoByShopId(request, response) {
  if (!request.query.shopId || !/^[a-f\d]{24}$/i.test(request.query.shopId))
    return response.sendStatus(400);

  try {
    let promo = await promoModel.findPromoByShopId(request.query.shopId);

    if (!promo)
      return response.sendStatus(404);

    if (!promo.active)
      return response.status(200).json({});

    // eslint-disable-next-line no-unused-vars
    let { _id, id, shopId, createdDate, lastModifiedDate, ...rest } = promo;
    response.status(200).json(rest);
  } catch (error) {
    response.sendStatus(500);
  }
}

module.exports = {
  findPromoByShopId
};
