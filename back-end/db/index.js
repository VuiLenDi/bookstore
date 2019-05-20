const connection = require('./connection');
const Books = require('../models/books.model');
const Users = require('../models/users.model');

connection.once('open', () => {
  console.info('MongoDb Connection Established!');
});

module.exports = {
  Books,
  Users
};
