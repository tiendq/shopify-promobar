let requestPromise = require('request-promise-native');
let { WEBHOOK } = require('./constant');
let { createPostOptions, createGetOptions } = require('./utils');

async function add(shop, topic, url) {
  let body = {
    webhook: {
      topic,
      address: url
    }
  };

  let options = createPostOptions(shop, WEBHOOK, body);

  return await requestPromise(options);
}

async function list(shop, topic) {
  let query = {
    topic,
    fields: 'id'
  };

  let options = createGetOptions(shop, WEBHOOK, query);

  return await requestPromise(options);
}

module.exports = {
  add,
  list
};
