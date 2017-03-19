const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://qftioduv:ZPRMRqRgl8yZxdtayEILGwqnP7pUGrDE@fizzy-cherry.db.elephantsql.com:5432/qftioduv');
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes')(app);

app.use(express.static(path.join(__dirname, 'mean-app/dist')));

// Route to angular App
app.get('/app', (req, res) => {
    res.sendFile(path.join(__dirname, 'mean-app/dist/index.html'));
});

/* Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));*/

// Test Authentification

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully with PGSQL Database.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = app;