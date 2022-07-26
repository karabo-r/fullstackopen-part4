const BlogRouter = require("express").Router();
const Blog = require("../models/blog");

BlogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

BlogRouter.post("/", async (request, response) => {
	const data = request.body;
	const newBlog = new Blog({
		title: data.title,
		author: data.author,
		url: data.url,
		likes: data.likes || 0,
	});

	const result = await newBlog.save();
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
