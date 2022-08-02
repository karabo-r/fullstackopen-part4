const UserRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// get all users
UserRouter.get("/", async (request, response) => {
	const AllUsersInDb = await User.find({}).populate("blogs", {
		url: 1,
		title: 1,
		author: 1,
	});
	response.json(AllUsersInDb);
});

// create a new user
UserRouter.post("/", async (request, response, next) => {
	try {
		await User.deleteMany({})
		const { username, name } = request.body;
		console.log(username, name);
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
	} catch (error) {
		next(error);
	}
});

module.exports = UserRouter;
