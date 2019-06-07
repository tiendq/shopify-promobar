let config = require('../../config');
let shopData = require('../shop/data');

async function sendLoaderScript(request, response) {
  try {
    let shop = await shopData.findShopById(request.params.shopId);

    if (!shop)
      return response.sendStatus(400);

    let { headers, content } = generateLoaderScript(request.params.shopId);

    response.set(headers);
    response.send(content);
  } catch (error) {
    response.sendStatus(500);
  }
}

function generateLoaderScript(shopId) {
  let script = getLoaderScript(shopId, config.revision, config.url);
  let maxAge = 'development' === process.env.NODE_ENV ? 1 : 300; // in seconds

  return {
    headers: {
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': `public, max-age=${maxAge}`,
      'Content-Length': script.length,
      'Content-Type': 'application/javascript; charset=UTF-8',
      'Last-Modified': new Date().toUTCString()
    },
    content: script
  };
}

function getLoaderScript(shopId, revision, appUrl) {
  let scopeName = 'ShopifyPromoBar';

  let script = `
    var ${scopeName}=${scopeName} || {};
    ${scopeName}.appUrl='${appUrl}';
    ${scopeName}.shopId='${shopId}';
    (function() {
      var le=document.createElement('link'),se=document.createElement('script');
      le.rel='stylesheet';
      le.href='${appUrl}/lib/promo.${revision}.css';
      document.head.appendChild(le);
      se.async=true;
      se.src='${appUrl}/lib/promo.${revision}.js';
      document.body.appendChild(se);
    })();`;

  return script;
}

module.exports = {
  sendLoaderScript
}
