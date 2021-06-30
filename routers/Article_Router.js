const express = require("express");
require("../mogoose-connect");
const article_model = require("../models/article-model");
const Article_Router = express.Router();

// create an article post
Article_Router.post('/articles', async (req, res) => {
    const date = new Date();
    const article = new article_model({
        title: req.body.title,
        description: req.body.description,
        date_created: date,
        author: req.body.author,
        category: req.body.category
    });

    try{
        await article.save();
        console.log("the following data has been added to database");
        console.log(article);
        res.send(article);
    } catch (e){
        res.send(e);
    }

});

// get all articles in the database
Article_Router.get('/articles', async (req, res) => {
    try{
        const articles = await article_model.find({});
        res.send(articles);

    } catch (e) {
        res.send(e);
    }
    
});

// delete an article by its Id
Article_Router.delete('/articles/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const article_to_be_deleted = await article_model.findByIdAndDelete(id);
        if(!article_to_be_deleted){
            res.send("Cannot delete an article that doesn't exist");
        } else {
            console.log("the following article has been deleted \n", article_to_be_deleted);
            res.send(article_to_be_deleted);
        }
       

    } catch (e){
        res.send(e);
    }
})

// update an article
Article_Router.put('/articles/:id', async (req, res) => {
    const incomingUpdates = Object.keys(req.body);
    const validUpdates = ['title', 'description', 'category'];
    const isValidUpdate = incomingUpdates.every((update) => validUpdates.includes(update));

    if(isValidUpdate == false){ // if any of the updates sent are not valid then an error will return
        return res.status(500).send({"error": "Invalid updates"});
    } else {
        const id = req.params.id;
        try {
            const article = await article_model.findById(id); // find a user
            if(!article){ // if no user exist then return an 404 error
                return res.status(404).send({"error": "article not found in database"});
            } else {
                // if the user is found update the data 
                incomingUpdates.forEach((update) => article[update] = req.body[update]);
                const date = new Date();
                article.edited_on = date;
                await article.save(); // save updates user data
                res.status(200).send(article);
            }

        } catch (e) {
            res.status(500).send(e);
        }    
    }
});


module.exports = Article_Router;