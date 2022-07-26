const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
	{
		title: "The great war of 1812",
		author: "John Smith",
		url: "url example",
		likes: 43,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	let newBlog = new Blog(initialBlogs[0]);
	await newBlog.save();
}, 10000);

test("returns the correct amount of blog posts in the JSON format", async () => {
	await api.get("/api/blogs")
    .expect(200)
    .expect('Content-type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
}, 10000);

test('Verifying the existence of id property', async ()=>{
	const response = await api.get('/api/blogs')
	const blogId = response.body[0].id
	expect(blogId).toBeDefined()
}, 10000)

afterAll(() => {
	mongoose.connection.close();
});
