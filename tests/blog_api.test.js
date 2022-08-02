const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const User = require("../models/user");

const app = require("../app");
const api = supertest(app);

const initialBlogs = {
	title: "The great war of 1812",
	author: "John Smith",
	url: "url example",
	likes: 1,
};

const initialUser = {
	username: "test-username",
	name: "test-name",
	password: "test-password",
};

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});
}, 10000);

describe("test api methods /blogs", () => {
	test("get all blogs", async () => {
		api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-type", /application\/json/);
	});

	test("create a blog", async () => {
		// create user
		await api.post("/api/users").send(initialUser);
		//login as user to get token
		const loginUser = await api.post("/api/login").send(initialUser);
		const userToken = `bearer ${loginUser.body.token}`;
		// create a blog as the user using token
		await api
			.post("/api/blogs")
			.send(initialBlogs)
			.set("Authorization", userToken)
			.expect(201)
			.expect("Content-type", /application\/json/);
	});
});

describe("check individual blog - /blogs", () => {
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

			api.post("/api/blogs").send(BlogwithoutTitle).expect(400);
		});
		test("url missing", async () => {
			const BlogwithoutUrl = new Blog({
				title: "test title",
				author: "test author",
				likes: 12,
			});

			api.post("/api/blogs").send(BlogwithoutUrl).expect(400);
		});
	});
});

afterAll(() => {
	mongoose.connection.close();
});
