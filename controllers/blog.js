const BlogRouter = require('express').Router()
const Blog = require('../models/blog')

BlogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs);
});

BlogRouter.post("/", async (request, response) => {
	const data = request.body
	const newBlog = new Blog({
		title: data.title,
		author: data.author,
		url: data.url,
		likes: data.likes || 0
	})
	
	const result = await newBlog.save()
	response.status(201).json(result);
	console.log("blog has been saved");
});

module.exports = BlogRouter