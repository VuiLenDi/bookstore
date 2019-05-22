const elasticsearch = require('elasticsearch');

class ElasticSearch {
  constructor() {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }

  async createIndex(index) {
    return await this.client.indices.create({
      index: index
    });
  }

  ping() {
    this.client.ping({ requestTimeout: 30000 }, function(error) {
      if (error) {
        console.error('Elasticsearch cluster is down!');
      } else {
        console.log('Everything is ok');
      }
    });
  }

  async indexExists(index) {
    const isExist = await this.client.indices.exists({
      index: index
    });
    return isExist;
  }

  async index(index, type, payload) {
    await this.client.index({
      index: index,
      type: type,
      body: {
        title: payload.title,
        desc: payload.desc,
        category: payload.category
      }
    });
  }

  async searchData(index, query) {
    let body = {
      query: {
        multi_match: {
          query,
          type: 'cross_fields',
          fields: ['title', 'desc', 'category'],
          operator: 'or'
        }
      }
    };

    const result = await this.client.search({
      index: index,
      size: 10,
      body: body
    });
    console.log(result);
  }

  deleteIndex(index) {
    return this.client.delete({
      index: index
    });
  }
}

module.exports = ElasticSearch;
