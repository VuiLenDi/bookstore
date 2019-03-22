/**
 * Created by Minh Tran <minh.tran@nashtechglobal.com> on 11/3/2016.
 */
// Libs
const express = require('express');
const BooksService = require('../books.service').Books;
const db = require('../../db');

//Router
const book_api_route = express.Router();

function returnData(data) {
    return {
        status: 200,
        data
    }
}

function returnErr() {
    return {
        status: 500,
        msg: 'Something wrong'
    }
}

function getAll(req, res) {
    const booksService = new BooksService(db, null);
    booksService.getList().then(function(result) {
        res.json(result);
    });
}

function validate(data) {
    if  (!("title" in data) || !("category" in data) || !("desc" in data)) {
        return false;
    } else if (data.title.length === 0 || data.category.length === 0 || data.desc.length === 0) {
        return false;
    }
    else if (data.title.length > 30) {
        return false;
    }
    return true;
}

function addBook(req, res) {
    const data = req.body;
    const booksService = new BooksService(db, data);
    if (validate(data)) {
        booksService.addBook().then(function(result) {
            res.json(returnData(result));
        });
    } else {
        res.json(returnErr());
    }
}

book_api_route.post('/addBook', addBook);
book_api_route.get('/list', getAll);

module.exports = book_api_route;
