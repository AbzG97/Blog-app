const request = require("supertest");
const index = require("../index");
const user_model = require("../models/user-model");
const {setup, testUserData, testUserDataID } = require("./DbTestSetup");


// runs before each test
beforeEach(setup);

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

test("Should logout user", async () => {
    const res = await request(index)
    .post("/users/logout")
    .set('Authorization', `Bearer ${testUserData.tokens[0].token}`)
    .expect(200)

    // assert that the tokens array is clean
    // console.log(res.body);
    const user = await user_model.findById(res.body.user._id);
    expect(user.tokens).toHaveLength(0);
    
});

test("Should not logout user", async () => {
    const res = await request(index)
    .post("/users/logout")
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


test("should update user data", async () => {
    const res = await request(index)
    .put('/users/profile/update')
    .set('Authorization', `Bearer ${testUserData.tokens[0].token}`)
    .send({
        name:"Abdulla Updated",
        email:"Abdulla.Ghazalah@hotmail.com",
        password:"Baghdad1997Updated"
    })
    .expect(200);

    // assert that the user data has been updated in the database
    const user = await user_model.findById(res.body.user._id);
    expect(user.email).toBe(res.body.user.email)
});

test("should not update user data", async () => {
    const res = await request(index)
    .put('/users/profile/update')
    .send({
        name:"Abdulla Updated",
        email:"Abdulla.Ghazalah@hotmail.com",
        password:"Baghdad1997Updated"
    })
    .expect(401);

   
});