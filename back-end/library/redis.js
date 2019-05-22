const redis = require('redis');
const client = redis.createClient(6379, 'localhost');

client.on('error', err => {
  console.log('Error: ', err);
});

module.exports = {
  client
};
