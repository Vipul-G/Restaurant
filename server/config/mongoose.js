const mongoose = require('mongoose');
const config = require('./config');
const debug = require('debug')('express-mongoose');

const mongoUri = config.mongo.uri;

mongoose
.connect(mongoUri, { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to the database: ${mongoUri}`);
});

db.on('error', () => {
  throw new Error(`Unable to connect to the database : ${mongoUri}`);
});

if (config.mongo.isDebug) {
  mongoose
  .set('debug', (collectionName, methodName, ...methodArgs) => {
    debug(`${collectionName}.${methodName}(${methodArgs})`);
  });
}

module.exports = db;
