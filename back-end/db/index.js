const connection = require('./connection');
const Books = require('../models/books.model');

connection.once('open', () => {
  console.info('MongoDb Connection Established!');
});

module.exports = {
  Books
};
