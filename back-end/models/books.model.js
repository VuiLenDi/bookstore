const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    desc: {
        type: String
    }
});

const collectionName = 'Books';
const Books = mongoose.model(collectionName, BookSchema, collectionName);

module.exports = Books;
