let ObjectID = require('mongodb').ObjectID;
let logger = require('../logger');
let db = require('../database').getConnection();

async function createShop(shop) {
  try {
    let result = await db.collection('shops').insertOne(shop);
    return result.insertedId.toHexString();
  } catch (error) {
    logger.log('error', `Failed to create new shop ${shop.name}`, error);
    throw error;
  }
}

async function updateRenewedShop(shop) {
  try {
    let result = await db.collection('shops').updateOne({
      _id: new ObjectID(shop.id)
    }, {
      $set: {
        accessToken: shop.accessToken,
        accessScope: shop.accessScope,
        installCount: shop.installCount,
        installedDate: shop.installedDate,
        lastModifiedDate: shop.lastModifiedDate
      }
    });

    if (1 === result.modifiedCount)
      logger.info(`Updated shop ${shop.id}`);
    else
      logger.warn(`Shop ${shop.id} not found`);

    return 1 === result.modifiedCount;
  } catch (error) {
    logger.log('error', `Failed to update shop ${shop.id}`, error);
    throw error;
  }
}

async function findShopByName(name) {
  try {
    let shop = await db.collection('shops').findOne({ name });
    return shop;
  } catch (error) {
    logger.log('error', `Failed to find shop ${name}`, error);
    throw error;
  }
}

async function findShopById(id) {
  try {
    return await db.collection('shops').findOne({ _id: new ObjectID(id) });
  } catch (error) {
    logger.log('error', `Failed to find shop ${id}`, error);
    throw error;
  }
}

async function removeApp(name) {
  try {
    let result = await db.collection('shops').updateOne({
      name
    }, {
      $set: {
        accessToken: '',
        lastModifiedDate: new Date()
      }
    });

    if (1 === result.modifiedCount)
      logger.info(`Removed app from shop ${name}`);
    else
      logger.warn(`Shop ${name} not found`);

    return 1 === result.modifiedCount;
  } catch (error) {
    logger.log('error', `Failed to remove app from shop ${name}`, error);
    throw error;
  }
}

module.exports = {
  createShop,
  updateRenewedShop,
  findShopByName,
  findShopById,
  removeApp
};
