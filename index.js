const express = require("express");
const app = express();
require("dotenv").config();
const Article_Router = require("./routers/Article_Router");
const User_Router = require("./routers/User_Router")

app.use(express.json());
app.use(Article_Router);
app.use(User_Router);

module.exports = app;