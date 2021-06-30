const request = require("supertest");
const index = require("../index");
const user_model = require("../models/user-model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { response } = require("../index");

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



// runs before each test
beforeEach(async () => {
    await user_model.deleteMany(); // clean up and delete the data
    // create dummy user data for other tests like logging in
    await new user_model(testUserData).save();

});

test("sign up user", async () => {
   const res =  await request(index)
    .post('/users')
    .send({
        name:"Abdulla",
        email:"Abdulla.Ghazalah@hotmail.com",
        password:"Baghdad1997"
    })
    .expect(201);

    // assert the db was changed correctly
    const user = await user_model.findById(res.body.user._id);

    // checks if there's a user added 
    expect(user).not.toBeNull();

    // assert about the response body (data entered)
    expect(res.body).toMatchObject({
        user: {
            name:"Abdulla",
            email:"Abdulla.Ghazalah@hotmail.com",
        },
        token: user.tokens[0].token
        
    });

    // assert that the password is encrypyed
    expect(res.body.user.password).not.toBe("Baghdad1997");


});

test("login user existing user", async () => {
    const res = await request(index)
    .post('/users/login')
    .send({
        email: testUserData.email,
        password: testUserData.password
    })
    .expect(200);

    // make sure user is added to db
    const user = await user_model.findById(res.body.user._id);
    expect(user).not.toBeNull();

    // assert response token matches users 2nd token in db
    console.log(res.body);
    expect(res.body.token).toBe(user.tokens[1].token);

    
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
    const res = await request(index)
    .get('/users/me/delete')
    .set('Authorization', `Bearer ${testUserData.tokens[0].token}`)
    .expect(200);

    // assert that the user was actually deleted from db
    const user = await user_model.findByIdAndDelete(res.body._id);
    expect(user).toBeNull();
});

test("should not delete account", async () => {
    await request(index)
    .get('/users/me/delete')
    .expect(401)
});