let winston = require('winston');
let config = require('../config');

// Document for version 2.x.x
// https://github.com/winstonjs/winston/tree/2.4.0

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      filename: config.logFile
    })
  ]
});

// If we're not in production then log to the `console` with the format:
// ${info.level}: ${info.message} JSON.stringify({ ...rest })
if ('development' === process.env.NODE_ENV) {
  logger.add(winston.transports.Console);
}

module.exports = logger;
