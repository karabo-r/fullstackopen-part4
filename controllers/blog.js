const BlogRouter = require('express').Router()
const Blog = require('../models/blog')

BlogRouter.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

BlogRouter.post("/", (request, response) => {
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
		console.log("blog has been saved");
	});
});

module.exports = BlogRouter