const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Import the required dependencies (Securing the server)
const jwt = require('express-jwt');
const cors = require('cors');

// Set up the express app
const app = express();

// We are going to implement a JWT middleware that will ensure the validity of our token.
// We'll require each protected route to have a valid token sent in the Authorization header

app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes')(app);
require('./server/routes/clientRoutes')(app);

/* Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));*/


module.exports = {app};
