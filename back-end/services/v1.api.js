const book_api_routes = require('./v1/books.api');
const auth_api_route = require('./v1/auth.api');

const express = require('express');
const v1_api_route = express.Router();

v1_api_route.use('/books', book_api_routes);
v1_api_route.use('/auth', auth_api_route);

module.exports = v1_api_route;
