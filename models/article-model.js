const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true
    }, 
    description: {
        type: 'string',
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    author: {
        type: 'string',
        required: false,
        default: "Bob"

    },
    category: {
        type: Array,
        requried: false,
        default: ["Generic", "Slice of life"]

    },
    edited_on: {
        type: Date,
        required: false
    },
});

const article_model = mongoose.model( "article", articleSchema, "articles");

module.exports = article_model;
