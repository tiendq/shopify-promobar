let logger = require('./logger');

// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
function init(app) {
  // eslint-disable-next-line no-unused-vars
  app.use((request, response, next) => {
    logger.error(`File not found ${request.originalUrl}`);
    response.sendStatus(404);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((error, request, response, next) => {
    logger.error('Internal server error', error);
    response.sendStatus(500);
  });
}

module.exports = {
	init
};
