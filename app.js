const app = require("./index");


const port = 3000 || process.env.PORT;

app.listen(port, () => {
    console.log("server is live on port", port);
});