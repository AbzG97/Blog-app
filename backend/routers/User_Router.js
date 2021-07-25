const express = require("express");
const user_model = require("../models/user-model");
require("../mogoose-connect");
const User_Router = express.Router();
const authenticate = require("../authenticate_middleware");

// create user / sign up 
User_Router.post('/users/create', async (req, res) => {
    console.log(req.body);
    const newUser = new user_model({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    try {
        
        const new_token = await newUser.GenerateAuthTokens();

        res.cookie('auth_token',new_token, { httpOnly: true, secure: false, maxAge: 3600000 });
        await newUser.save();
        console.log(newUser);
        res.status(201).send({ user: newUser, token: new_token });

    } catch (e) {
        res.status(500).send(e);
    }
});

// login user using findByCred statics which will return a user object
// it uses the email and password of a user to find them in the database
// it also generates jwt tokens for the user object to be used in other routes that require authentication. 
User_Router.post("/users/login", async (req, res) => {
    console.log(req.body);
    try {
        const user = await user_model.findByCreds(req.body.email, req.body.password);
        const new_token = await user.GenerateAuthTokens();
        res.cookie('auth_token',new_token, { httpOnly: true, secure: false, maxAge: 3600000 });
        await user.save();
        res.status(200).send({ user: user, token: new_token });

    } catch (e) {
        res.status(404).send({ "error": "can't find user" });
    }

});

// read the profile of an authenticated user
User_Router.get('/users/me', authenticate, async (req, res) => {
    try {
        const user = await user_model.findById(req.user._id);
        console.log(user);
        res.status(200).send({user: user});

    } catch (e){
        res.status(401).send({message: "can't get data for unauthorized user"});
    }
    
   
    //console.log(req.user);
    // console.log(req.token);
   
});


// logout route also the user needs to authenticated in order to logout
User_Router.post('/users/logout', authenticate, async (req, res) => {
    try {
        // basically just emptying the tokens array so the user won't have any tokens anymore to be validated
        const user = await user_model.findById(req.user._id);
        user.tokens = [];
        await user.save();
        res.status(200).send({message: "logged out of every device and deleted all tokens completed",user: user});

    } catch (e) {
        res.status(500).send(e);

    }

});
// update user data 
User_Router.put("/users/profile/update", authenticate, async (req, res) => {
    // validating the updates so only valid updates are name, email and password
    const incomingUpdates = Object.keys(req.body);
    const validUpdates = ['name', 'email', 'password'];
    const isValidUpdate = incomingUpdates.every((update) => validUpdates.includes(update));

    if (isValidUpdate == false) { // if any of the updates sent are not valid then an error will return
        return res.status(500).send({ "error": "Invalid updates" });
    } else {
        try {
            const user = await user_model.findById(req.user._id); // find a user
            if (!user) { // if no user exist then return an 404 error
                return res.status(404).send({ "error": "user not found in database" });
            } else {
                // if the user is found update the data 
                incomingUpdates.forEach((update) => user[update] = req.body[update]);
                await user.save(); // save updates user data
                res.status(200).send({message: "update successful", user: user});
            }

        } catch (e) {
            res.status(500).send(e);
        }
    }

});

// get users data
User_Router.get("/users", async (req, res) => {
    const users = await user_model.find({});
    if (!users) {
        res.status(404).send({ "error": "no users in database" });
    } else {
        res.status(200).send(users);
    }
});

User_Router.get("/users/me/delete", authenticate, async (req,res) => {
    try {
        await user_model.findByIdAndDelete(req.user._id);
        res.status(200).send({message: "delete successful"});

    } catch (e) {
        res.status(401).send({message: "can't delete a nonexistent user"});
    }
});

module.exports = User_Router;