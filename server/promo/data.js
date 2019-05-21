let ObjectID = require('mongodb').ObjectID;
let logger = require('../logger');
let db = require('../database').getConnection();
let { DEFAULT_PROMO } = require('./const');

async function createPromo(promo) {
  try {
    let result = await db.collection('promos').insertOne(promo);
    return result.insertedId.toHexString();
  } catch (error) {
    logger.log('error', `Failed to create new promo of shop ${promo.shopId}`, error);
    throw error;
  }
}

async function updatePromo(promo) {
  try {
    let result = await db.collection('promos').updateOne({
      _id: new ObjectID(promo.id)
    }, {
      $set: {
        active: promo.active,
        content: promo.content,
        targetUrl: promo.targetUrl,
        color: promo.color,
        bgColor: promo.bgColor,
        position: promo.position,
        delay: promo.delay,
        lastModifiedDate: promo.lastModifiedDate,
        cta: promo.cta
      }
    });

    if (1 !== result.modifiedCount)
      logger.warn(`Promo ${promo.id} is not updated`);

    return 1 === result.modifiedCount;
  } catch (error) {
    logger.log('error', `Failed to update promo ${promo.id}`, error);
    throw error;
  }
}

async function findPromoById(id) {
  try {
    let result = await db.collection('promos').findOne({ _id: new ObjectID(id) });

    if (!result)
      logger.warn(`Promo ${id} not found`);

    return result;
  } catch (error) {
    logger.log('error', `Failed to find promo ${id}`, error);
    throw error;
  }
}

async function findPromoByShopId(shopId) {
  try {
    let result = await db.collection('promos').findOne({ shopId });

    if (!result)
      logger.warn(`Promo of shop ${shopId} not found`);

    return result;
  } catch (error) {
    logger.log('error', `Failed to find promo of shop ${shopId}`, error);
    throw error;
  }
}

async function resetPromo(shopId) {
  let promo = {
    shopId,
    createdDate: new Date(),
    lastModifiedDate: new Date(),
    ...DEFAULT_PROMO
  };

  try {
    let result = await db.collection('promos').findOneAndUpdate({
      shopId
    }, {
      $set: promo
    }, {
      upsert: true
    });

    return 1 === result.ok;
  } catch (error) {
    logger.log('error', `Failed to reset existing promo of shop ${shopId}`, error);
    throw error;
  }
}

module.exports = {
  createPromo,
  updatePromo,
  findPromoById,
  findPromoByShopId,
  resetPromo
};
