const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const user_model = require("../models/user-model");
const article_model = require("../models/article-model");

const testUserDataID = new mongoose.Types.ObjectId();
const testUserData = {
    _id: testUserDataID,
    name: "bob",
    email: "bob@hotmail.com",
    password: "12345678",
    tokens: [{
        token: jwt.sign({id: testUserDataID}, process.env.SECRET)
    }]
}

const testArticleID = mongoose.Types.ObjectId();
const date = new Date();
const testArticleData = {
    _id: testArticleID,
    title: "test title",
    description: "test desc",
    date_created: date.toISOString(),
    author: testUserData._id,
    category: ["Generic", "Slice of life"],
    edited_on: date.toISOString()
}

const setup = async () => {
    await user_model.deleteMany(); // clean up and delete the data
    await article_model.deleteMany();
    // create dummy user data for other tests like logging in
    await new user_model(testUserData).save();
    await new article_model(testArticleData).save();
}

module.exports = {
    testUserDataID,
    testUserData,
    setup
}
