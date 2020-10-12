const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes/index');

// get application
const app = express();

// logger
if (config.env === 'development') {
  app.use(logger('dev'));
}

//get dist folder
const distDir = path.join(__dirname, '../../dist');

// use dist folder as hosting folder by express-
app.use(express.static(distDir));

// parsing from api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure application
app.use(helmet());

// enable cors
app.use(cors());

// localhost:3000/api
app.use('/api/', routes);
// localhost:3000/images
app.use('/images', express.static(path.join(__dirname, '../images')));

// serve the index.html
app.get('*', (req, res) => res.sendFile(path
  .join(distDir, 'index.html')));

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message
  })
  next(err);
})

module.exports =app;
