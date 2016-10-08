require('babel-register')({
	presets: ['react']
});

var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var logger = require('./util/logger');

require('mongoose').connect(config.db.url);
require('./middleware/appMiddlware')(app);

app.use(express.static('public'));
app.use(require('../routes/index.jsx'));

app.use('/api', api);

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid password');
    return;
  }
  logger.error(err.stack);
  res.status(500).send('Oops');
});

module.exports = app;
