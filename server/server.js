let session = require('express-session');
let cookieParser = require('cookie-parser');
let handlebars = require('express-handlebars');
let serveStatic = require('serve-static');
let config = require('../config');
let logger = require('./logger');
var errorHandler = require('./error-handler');
let database = require('./database');

async function start(app) {
  logger.info('Connecting to database...');

  let connection = await database.connect();

  if (!connection)
    return process.exit(1);

  logger.info('Connected to database. Starting application...');
  startApplication(app);
}

function startApplication(app) {
  if ('development' !== process.env.NODE_ENV) {
    app.set('trust proxy', true);
    app.enable('view cache');
    app.disable('x-powered-by');
  }

  app.engine('hbs', handlebars({
    defaultLayout: 'shopify',
    extname: 'hbs'
  }));

  app.set('view engine', 'hbs');

  // Static files will be handled by NGINX in production.
  // Configure access for public static files e.g. client side images, JavaScript, CSS, fonts.
  if ('development' === process.env.NODE_ENV) {
    let staticOptions = {
      index: false,
      maxAge: config.staticMaxAge
    };

    // Put it on top of route chain so no session and cookies for static file requests.
    app.use('/static', serveStatic('public/static', staticOptions));
    app.use('/', serveStatic('public', staticOptions));
    app.use('/tests', serveStatic('tests', staticOptions));
  }

  app.use(cookieParser(config.cookieSecret));

  app.use(session({
    name: 'SID',
    secret: config.cookieSecret,
    cookie: {
      maxAge: config.sessionMaxAge,
      secure: 'production' === process.env.NODE_ENV
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
  }));

  configRoutes(app);

  // https://www.loggly.com/blog/node-js-error-handling/
  errorHandler.init(app);

  process.on('unhandledRejection', (reason, promise) => {
    logger.log('error', 'Unhandled promise rejection', promise);
  });

  app.listen(config.port, () => logger.info(`### Listening on port ${config.port} in ${app.get('env').toUpperCase()} mode...`));
}

function configRoutes(app) {
  app.use('/api', require('./api/route'));
  app.use('/lib', require('./lib/route'));
  app.use('/promo', require('./promo/route'));
  app.use('/shop', require('./shop/route'));
  app.use('/shopify', require('./shopify/route'));
  app.use('/webhooks', require('./webhooks/route'));
}

module.exports = {
  start
};
