const connection = require('./connection');
const { client } = require('../library/redis');
const Books = require('../models/books.model');

connection.once('open', () => {
  console.info('MongoDb Connection Established!');
});

client.on('ready', () => {
  console.info('Redis is ready');
});

module.exports = {
  Books
};
