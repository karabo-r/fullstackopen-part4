const UserRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

UserRouter.get("/", async (request, response) => {
	const AllUsersInDb = await User.find({});
	response.json(AllUsersInDb);
});

UserRouter.post("/", async (request, response, next) => {
    try {
        
        const { username, name } = request.body;
        let password = request.body.password;
        let passwordHash = "";
        if (password) {
            const saltRounds = 10;
            passwordHash = await bcrypt.hash(password, saltRounds);
        }
    
        const newUser = new User({
            username,
            name,
            password: passwordHash,
        });
    
        const savedUser = await newUser.save();
        response.status(201).json(savedUser);
    } catch (error){
        // response.status(400).send(error)
        next(error)
    }


});

module.exports = UserRouter;
