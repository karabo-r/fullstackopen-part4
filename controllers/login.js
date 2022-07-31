require("dotenv").config();
const LoginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

LoginRouter.post("/", async (request, response) => {
	const { username, password } = request.body;
	const user = await User.findOne({ username });
	const isPasswordCorrect =
		user === null ? false : await bcrypt.compare(password, user.password);
	if (!(user && isPasswordCorrect)) {
		return response.status(401).json({
			error: "invalid username or password",
		});
	}

	const userToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userToken, process.env.TOKEN_KEY);

	response
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

module.exports = LoginRouter;
