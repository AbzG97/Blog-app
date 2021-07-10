const express = require("express");
require("../mogoose-connect");
const article_model = require("../models/article-model");
const authenticate = require("../authenticate_middleware");
const Article_Router = express.Router();

// create an article post
Article_Router.post('/articles', authenticate, async (req, res) => {
    const date = new Date();
    const article = new article_model({
        title: req.body.title,
        description: req.body.description,
        date_created: date.toISOString(),
        author: req.user._id,
        category: req.body.category,
        edited_on: date.toISOString()
    });

    try {
        await article.save();
        res.status(201).send({
            message: "new article posted",
            article: article
        });
    } catch (e) {
        res.status(500).send({
            message: "failed to create article"
        });
    }

});

// get articles made by authenticated user 
Article_Router.get("/myArticles", authenticate, async (req, res) => {
    try {
        const articles = await article_model.find({
            author: req.user._id
        });
        if (!articles) {
            res.send(204).send({
                message: "no articles posted by this user"
            });
        }
        res.status(200).send({
            articles: articles
        });

    } catch {
        res.status(500).send({
            message: "failed to get articles"
        })
    }
})
// get all articles in the database
Article_Router.get('/articles', async (req, res) => {
    try {
        const articles = await article_model.find({});
        res.send(articles);

    } catch (e) {
        res.send(e);
    }

});

// delete an article
Article_Router.delete('/articles/delete', authenticate, async (req, res) => {
    try {
        const article = await article_model.find({
            author: req.user_id
        });
        if (!article) {
            res.status(404).send("Cannot delete an article that doesn't exist");
        }
        await article_model.findByIdAndDelete(article._id);
        res.status(200).send({
            message: "article deleted"
        });

    } catch {
        res.status(500).send({
            message: "Article couldn't be deleted"
        });
    }
});

// update an article
Article_Router.put('/articles/update', authenticate, async (req, res) => {
    const incomingUpdates = Object.keys(req.body);
    const validUpdates = ['title'];
    const isValidUpdate = incomingUpdates.every((update) => validUpdates.includes(update));
    if (isValidUpdate == false) { // if any of the updates sent are not valid then an error will return
        return res.status(500).send({
            "error": "Invalid updates"
        });
    } else {
        try {
            const article = await article_model.find({
                author: req.user._id
            });
            // console.log(article);
            if (!article) {
                res.status(404).send({
                    message: "article not found in database"
                });
            }
           
            // if the user is found 
    
            incomingUpdates.forEach((update) => article[update] = req.body[update]);
            // const date = new Date();
            // article.edited_on = date.toISOString();
            console.log(article);
            await article.save(); // save updates user data
            res.status(200).send({
                messsage: "article updated",
                article: article
            });

        } catch (e) {
            res.status(500).send({
                message: "failed to update the article"
            });
        }
    }
});


module.exports = Article_Router;