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
		likes: 1,
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

	test('check put method', async () =>{
		const newLikes = {
			likes: initialBlogs[0].likes + 1
		}

		const originalBlog = await api.get('/api/blogs')
		const originalBlogId = originalBlog.body[0].id

		await api
			.put(`/api/blogs/${originalBlogId}`)
			.send(newLikes)
			.expect(200)
		
		const updatedBlog = await api.get('/api/blogs')
		const updatedBlogLikes = updatedBlog.body[0].likes
		
		expect(updatedBlogLikes).not.toEqual(initialBlogs[0].likes)

	}, 100000)

	test('check delete method', async ()=>{
		const response = await api.get('/api/blogs')
		const id = response.body[0].id

		api
		.delete(`/api/blogs/${id}`)
		.expect(204)
	})
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

	describe("Title and url properties are missing respond with 400", () => {
		test("title missing", async () => {
			const BlogwithoutTitle = new Blog({
				author: "test author",
				url: "test url",
				likes: 12,
			});

			api
			.post('/api/blogs')
			.send(BlogwithoutTitle)
			.expect(400)
		});
		test("url missing", async () => {
			const BlogwithoutUrl = new Blog({
				title: 'test title',
				author: "test author",
				likes: 12,
			});

			api
			.post('/api/blogs')
			.send(BlogwithoutUrl)
			.expect(400)
		});
	});
});

afterAll(() => {
	mongoose.connection.close();
});
