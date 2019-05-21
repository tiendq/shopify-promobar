let express = require('express');
let server = require('./server/server');

let app = express();
server.start(app);

module.exports = app;
