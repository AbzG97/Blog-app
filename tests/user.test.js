const request = require("supertest");
const index = require("../index");
const user_model = require("../models/user-model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const testUserDataID = new mongoose.Types.ObjectId();
const testUserData = {
    _id: testUserDataID,
    name: "bob",
    email: "bob@hotmail.com",
    password: "12345678",
    tokens: [{
        token: jwt.sign({id: testUserDataID}, "SecretToken")
    }]
}

console.log(testUserData.tokens[0].token);

// runs before each test
beforeEach(async () => {
    await user_model.deleteMany(); // clean up and delete the data
    // create dummy user data for other tests like logging in
    await new user_model(testUserData).save();

});

test("sign up user", async () => {
    await request(index)
    .post('/users')
    .send({
        "name":"Abdulla",
        "email":"Abdulla.Ghazalah@hotmail.com",
        "password":"Baghdad1997"
    })
    .expect(201);

});

test("login user existing user", async () => {
    await request(index)
    .post('/users/login')
    .send({
        email: testUserData.email,
        password: testUserData.password
    })
    .expect(200);

});

test("should not login non-existent user", async () => {
    await request(index)
    .post('/users/login')
    .send({
        "email":"Abdulla.Ghazalah@hotmail.com",
        "password":"Baghdad1997"
    })
    .expect(404);

});

test("should fetch user profile", async () => {
    await request(index)
    .get("/users/me")
    .set('Authorization', `Bearer ${testUserData.tokens[0].token}`)
    .expect(200);
});

test("should not fetch any thing for unauthenticated user", async() =>{
    await request(index)
    .get("/users/me")
    .send()
    .expect(401)
});

test("should delete account", async () => {
    await request(index)
    .get('/users/me/delete')
    .set('Authorization', `Bearer ${testUserData.tokens[0].token}`)
    .expect(200)
});

test("should not delete account", async () => {
    await request(index)
    .get('/users/me/delete')
    .expect(401)
});