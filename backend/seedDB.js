// const mongoose = require("mongoose");
// // const user_model = require("../models/user-model");
// const article_model = require("./models/article-model");

// const date = new Date();
// const articles = [
//     {
//         _id: mongoose.Types.ObjectId(),
//         title: "test title 1",
//         description: "test desc 1",
//         date_created: date.toISOString(),
//         author: "Bob",
//         category: ["Programming"],
//         edited_on: date.toISOString()
//     },
//     {
//         _id: mongoose.Types.ObjectId(),
//         title: "test title 2",
//         description: "test desc 2",
//         date_created: date.toISOString(),
//         author: "Billy",
//         category: ["Gaming"],
//         edited_on: date.toISOString()
//     },
//     {
//         _id: mongoose.Types.ObjectId(),
//         title: "test title 3",
//         description: "test desc 3",
//         date_created: date.toISOString(),
//         author: "Jax",
//         category: ["News"],
//         edited_on: date.toISOString()
//     }
// ]

// const data = {
//             _id: mongoose.Types.ObjectId(),
//             title: "test title 1",
//             description: "test desc 1",
//             date_created: date.toISOString(),
//             author: "Bob",
//             category: ["Programming"],
//             edited_on: date.toISOString()
//         }

// const seed = async (req, res) => {
//     const newArticle = new article_model(data);
//     await newArticle.save();
// }

// seed();

// const seed = async () => {
//     // await article_model.deleteMany();
//     articles.map(async (article) => {
//         const data = await article_model(article);
//         await data.save(); 
//     });
// }

// seed();
