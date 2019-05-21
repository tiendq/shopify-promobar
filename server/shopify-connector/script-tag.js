let requestPromise = require('request-promise-native');
let { SCRIPT_TAG } = require('./constant');
let { createPostOptions, createGetOptions } = require('./utils');

async function add(shop, scriptUrl) {
  let body = {
    script_tag: {
      event: 'onload',
      src: scriptUrl
    }
  };

  let options = createPostOptions(shop, SCRIPT_TAG, body);

  return await requestPromise(options);
}

async function list(shop) {
  let query = {
    fields: 'id'
  };

  let options = createGetOptions(shop, SCRIPT_TAG, query);

  return await requestPromise(options);
}

module.exports = {
  add,
  list
};
