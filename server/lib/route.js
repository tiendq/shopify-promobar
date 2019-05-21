let path = require('path');
let router = require('express').Router();
let loader = require('./client-library-loader');

// Merchant website initially sends this request to load client library,
// shop account is identified by shopId parameter.
router.get('/loader.:shopId([a-f\\d]{24}).js', (request, response) => {
  loader.sendLoaderScript(request, response);
});

if ('development' === process.env.NODE_ENV) {
  // Response promo[.js|.css] files with revision to reset browser cache.
  // Handle by NGINX in production.
  router.get('/promo.:revision([a-f\\d]{8}).:ext(js|css)', (request, response) => {
    let ext = request.params.ext;

    response.sendFile(path.join(process.cwd(), `public/static/${ext}/promo.${ext}`), {
      maxAge: 1,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  });
}

module.exports = router;
