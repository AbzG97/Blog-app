const express = require("express");
const port = 3000 || process.env.PORT;
const app = express();
const Article_Router = require("./routers/Article_Router");
const User_Router = require("./routers/User_Router")

app.use(express.json());
app.use(Article_Router);
app.use(User_Router);


app.listen(port, () => {
    console.log("server is live on port", port);
});