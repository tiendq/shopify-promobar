const development = require('./development');
const production = require('./production');
const staging = require('./staging');

if ('development' === process.env.NODE_ENV)
  module.exports = development;
else if ('staging' === process.env.NODE_ENV)
  module.exports = staging;
else
  module.exports = production;
