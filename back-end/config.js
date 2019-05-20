module.exports = {
  mongoDB: {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    hosts: process.env.MONGO_HOSTS,
    replicaSet: process.env.MONGO_REPLICASET,
    readPreference: process.env.MONGO_READPRE,
    database: process.env.MONGO_DB || 'bookstore',
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    caCert: process.env.MONGO_SHARDED_CERT,
    caKey: process.env.MONGO_SHARDED_KEY
  },
  tokenKey: process.env.TOKEN_KEY || 'tokeysecretkey'
};
