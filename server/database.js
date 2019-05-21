let mongoClient = require('mongodb').MongoClient;
let config = require('../config');
let logger = require('./logger');

let mongoConnection = null;

async function connect() {
  try {
    let connection = await mongoClient.connect(config.mongodb.url, {
      poolSize: config.mongodb.poolSize
    });

    mongoConnection = connection;
    return connection;
  } catch (error) {
    logger.error('Failed to make database connection', error);
    return null;
  }
}

function getConnection() {
  return mongoConnection;
}

module.exports = {
  connect,
  getConnection
};
