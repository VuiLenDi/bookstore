// Libs
const express = require('express');
const AuthService = require('../auth.service').Users;
const db = require('../../db');

//Router
const auth_api_route = express.Router();

function register(req, res) {
  const data = req.body;
  // Validate Data
  const formatData = {
    username: data.username.trim(),
    password: data.password.trim()
  };

  const authService = new AuthService(db, formatData);
  authService.createAccount().then(function(result) {
    res.json({
      status: 200,
      data: result
    });
  });
}

function login(req, res) {
  const data = req.body;
  // Validate Data
  const formatData = {
    username: data.username.trim(),
    password: data.password.trim()
  };

  const authService = new AuthService(db, formatData);
  authService.login().then(function(result) {
    if (result.err) {
      res.json({
        status: 500,
        message: result.err
      });
    } else {
      res.json({
        status: 200,
        data: {
          ...formatData,
          ...result
        }
      });
    }
  });
}

auth_api_route.post('/register', register);
auth_api_route.post('/login', login);

module.exports = auth_api_route;
