const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");
// const blog = require('../models/blog')

const api = supertest(app);

const initialBlogs = [
	{
		author: "John Smith",
		subject: "The great war of 1812",
		likes: 43,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	let newBlog = new Blog(initialBlogs[0]);
	await newBlog.save();
});

test("returns the correct amount of blog posts in the JSON format", async () => {
	await api.get("/api/blogs")
    .expect(200)
    .expect('Content-type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
}, 10000);

afterAll(() => {
	mongoose.connection.close();
});
