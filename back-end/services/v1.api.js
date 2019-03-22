const book_api_routes = require('./v1/books.api');

const express = require('express');
const v1_api_route = express.Router();

v1_api_route.use('/books', book_api_routes);

module.exports = v1_api_route;
