const jwt = require("jsonwebtoken");
const secretKey = require("../config").tokenKey;
const book_api_routes = require("./v1/books.api");
const auth_api_route = require("./v1/auth.api");

const express = require("express");
const v1_api_route = express.Router();

function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], secretKey, function(err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

v1_api_route.use("/books", validateUser, book_api_routes);
v1_api_route.use("/auth", auth_api_route);

module.exports = v1_api_route;
