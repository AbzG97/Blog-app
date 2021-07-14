const request = require("supertest");
const index = require("../index");
const user_model = require("../models/user-model");
const article_model = require("../models/article-model");
const jwt = require("jsonwebtoken");


const {setup, testUserData, testUserDataID } = require("./DbTestSetup");





beforeEach(setup)


test("Create a new article", async () => {
    await request(index)
    .post("/articles")
    .set('Authorization', `Bearer ${testUserData.tokens[0].token}`)
    .send({
        title: "Jest testing",
        description: "I am learning jest and supertest today",
        category: ["Learning", "Programming"],
    })
    .expect(201);
   
});

test("find articles posted by an authenticated user", async () => {
    await request(index)
    .get("/myArticles")
    .set('Authorization', `Bearer ${testUserData.tokens[0].token}`)
    .expect(200);
});

test("delete article of an authenticate user", async () => {
    const res = await request(index)
    .delete("/articles/delete")
    .set('Authorization', `Bearer ${testUserData.tokens[0].token}`)
    .expect(200);

    const article = await user_model.findByIdAndDelete(res.body._id);
    expect(article).toBeNull();

});

test("update article of an authenticated user", async () => {
     await request(index)
    .put("/articles/update")
    .set('Authorization', `Bearer ${testUserData.tokens[0].token}`)
    .send({
        title: "updated title",
        description: "updated description"
        
    })
    .expect(200);
});

