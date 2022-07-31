require('dotenv').config()
const BlogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getUserToken = (request) => {
	const Authorization = request.get("Authorization");
	if (Authorization && Authorization.toLowerCase().startsWith("bearer ")) {
		return Authorization.substring(7);
	}
	return null;
};

BlogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

BlogRouter.post("/", async (request, response) => {
	await Blog.deleteMany({})
	const data = request.body;
	const token = getUserToken(request)
	const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id);
	const newBlog = new Blog({
		user: user._id,
		title: data.title,
		author: data.author,
		url: data.url,
		likes: data.likes || 0,
	});

	const result = await newBlog.save();
	user.blogs.push(newBlog._id);
	await user.save();

	response.status(201).json(result);
	console.log("blog has been saved");
});

BlogRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

BlogRouter.put("/:id", async (request, response) => {
	const body = request.body;
	const updatedNote = {
		likes: body.likes,
	};
	const results = await Blog.findByIdAndUpdate(request.params.id, updatedNote, {
		new: true,
	});
	response.json(results).status(200).end();
	console.log("blog has been updated");
});

module.exports = BlogRouter;
