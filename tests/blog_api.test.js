const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");
const blog = require("../models/blog");

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

describe("test api methods", () => {
	test("check get method", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-type", /application\/json/);

		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(initialBlogs.length);
	}, 10000);

	test("check post method", async () => {
		const newBlog = new Blog({
			title: "test title",
			author: "test author",
			url: "test url",
			likes: 123,
		});

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-type", /application\/json/);

		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(initialBlogs.length + 1);
	});
});

describe("check individual blog", () => {
	test("Verifying the existence of id property", async () => {
		const response = await api.get("/api/blogs");
		const blogId = response.body[0].id;
		expect(blogId).toBeDefined();
	}, 10000);

	test("Verifying defualt likes is 0", async () => {
		const BlogwithoutLikes = new Blog({
			title: "test title",
			author: "test author",
			url: "test url",
		});

		await api
			.post("/api/blogs")
			.send(BlogwithoutLikes)
			.expect(201)
			.expect("Content-type", /application\/json/);

		const blogs = await api.get("/api/blogs");
		const lastBlog = blogs.body[1];
		expect(lastBlog.likes).toEqual(0);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
