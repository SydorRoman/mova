// Node modules
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('../helpers/error-maker');

const photosRoute = require('../routes/photos');
const app = express();

app.use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors());

app
  .use('/photos', photosRoute);

app
  .listen(8080)
  .setTimeout(500000);

module.exports = app;
