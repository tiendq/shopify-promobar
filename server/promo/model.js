let logger = require('../logger');
let promoData = require('./data');

async function savePromo(promo) {
  if (promo.id) {
    let changedPromo = {
      ...promo,
      lastModifiedDate: new Date()
    };

    let success = await promoData.updatePromo(changedPromo);

    if (success)
      logger.info(`Updated promo ${changedPromo.id} successfully`);

    return success;
  } else {
    // Remove undefined id of new promo.
    // eslint-disable-next-line no-unused-vars
    let { id, ...rest } = promo;

    let newPromo = {
      ...rest,
      createdDate: new Date(),
      lastModifiedDate: new Date()
    };

    let promoId = await promoData.createPromo(newPromo);
    logger.info(`Created a new promo ${promoId} of shop ${promo.shopId}`);

    return promoId;
  }
}

async function findPromoByShopId(shopId) {
  let promo = await promoData.findPromoByShopId(shopId);

  if (promo) {
    let foundPromo = {
      ...promo,
      id: promo._id.toHexString()
    };

    return foundPromo;
  }

  return null;
}

module.exports = {
  savePromo,
  findPromoByShopId
};
