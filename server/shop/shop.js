let config = require('../../config');

function showSupportPage(request, response) {
  response.render('shop/support', {
    apiKey: config.shopify.apiKey,
    shopName: request.session.shop.name
  });
}

module.exports = {
  showSupportPage
};
