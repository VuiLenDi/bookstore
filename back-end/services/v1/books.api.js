/**
 * Created by Minh Tran <minh.tran@nashtechglobal.com> on 11/3/2016.
 */
// Libs
const express = require('express');
const BooksService = require('../books.service').Books;
const db = require('../../db');
const { client } = require('../../library/redis');
const ElasticSearch = require('../../library/elasticsearch');
require('../cronjobs');

const booksRedisKey = 'bookstore:books'

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
    return client.get(booksRedisKey, (err, books) => {
        if(books) {
            return res.json({
                source: 'cache',
                data: JSON.parse(books)
            })
        }
    })
}

function validate(data) {
    if  (!('title' in data) || !('category' in data) || !('desc' in data)) {
        return false;
    } else if (data.title.trim().length === 0 || data.category.trim().length === 0 || data.desc.trim().length === 0) {
        return false;
    }
    else if (data.title.trim().length > 30) {
        return false;
    }
    return true;
}

function addBook(req, res) {
    const data = req.body;
    const formatData = {
        title: data.title.trim(),
        category: data.category.trim(),
        desc: data.desc.trim()
    };
    const booksService = new BooksService(db, formatData);
    if (validate(data)) {
        booksService.addBook().then(function(result) {
            res.json(returnData(result));
        });
    } else {
        res.json(returnErr());
    }
}

async function searchBook(req, res) {
    const elasticSearch = new ElasticSearch();
    const result = await elasticSearch.searchData('books', req.query['query']);
}

book_api_route.post('/addBook', addBook);
book_api_route.get('/list', getAll);
book_api_route.get('/search', searchBook);

module.exports = book_api_route;
