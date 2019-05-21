function createGetOptions(shop, api, body) {
  return createRequestOptions(shop, 'GET', api, body);
}

function createPostOptions(shop, api, body) {
  return createRequestOptions(shop, 'POST', api, body);
}

function createRequestOptions(shop, method, api, body) {
  let baseOptions = {
    method: method,
    url: `https://${shop.name}.myshopify.com/admin/${api}.json`,
    headers: {
      'X-Shopify-Access-Token': shop.accessToken,
    },
    json: true,
    simple: false,
    resolveWithFullResponse: true
  };

  let options = 'GET' === method ? {
    ...baseOptions,
    qs: { ...body }
  } : {
    ...baseOptions,
    body: { ...body }
  };

  return options;
}

module.exports = {
  createGetOptions,
  createPostOptions
};
