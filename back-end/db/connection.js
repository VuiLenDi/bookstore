const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const config = require('../config').mongoDB;

let option = {
  useNewUrlParser: true
};

if (config.user) {
  option.user = config.user;
  option.pass = config.password;
}

const hosts = config.hosts || `${config.host}:${config.port}`;
let uri = `mongodb://${hosts}/${config.database}`;
if (config.replicaSet) {
  option.replicaSet = config.replicaSet;
  option.readPreference = config.readPreference;
} else if (config.caCert) {
  option.ssl = true;
  option.sslValidate = true;
  option.sslCA =  config.caCert;
  option.sslCert =  config.caKey;
  option.sslKey = config.caKey;
}
console.log(uri);
mongoose.connect(uri, option);

let connection = mongoose.connection;

connection.on('error', err => {
  console.log(err);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => { console.log('->MongoDB lost connection'); });
// The driver tries to automatically reconnect by default, so when the
// server starts the driver will reconnect and emit a 'reconnect' event.
mongoose.connection.on('reconnect', () => { console.log('->MongoDB reconnected'); });

// Mongoose will also emit a 'connected' event along with 'reconnect'. These
// events are interchangeable.
mongoose.connection.on('connected', () => {
  connection = mongoose.connection;
  console.log('->MongoDB connected'); });

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  connection.close(() => {
    console.info('Mongoose connection closed');
    process.exit(0);
  });
});

module.exports = connection;
