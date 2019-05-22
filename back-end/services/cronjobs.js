const cron = require('node-cron');
const db = require('../db');
const { client } = require('../library/redis');
const BooksService = require('./books.service').Books;
const ElasticSearch = require('../library/elasticsearch');

cron.schedule('* * * * *', () => {
  console.log('Run cron job');
  // TODO: Should export redis key
  const booksService = new BooksService(db, null);
  booksService.getList().then(async result => {
    const elasticsearch = new ElasticSearch();
    const isIndexExist = await elasticsearch.indexExists('books');
    if (!isIndexExist) {
      await elasticsearch.createIndex('books');
    }
    result.forEach(async item => {
      await elasticsearch.index('books', 'books', item);
    });
    client.set('bookstore:books', JSON.stringify(result));
  });
});
