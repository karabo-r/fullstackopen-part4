const app = require("../app");
const User = require("../models/user");
const supertest = require("supertest");

const api = supertest(app);

const initialUsers = [
	{
		username: "UncleBob",
		name: "John smith",
		password: "password123",
	},
];

beforeEach(async () => {
	await User.deleteMany({});
	const newUser = new User(initialUsers[0]);
	await newUser.save();
}, 10000);

describe("check api methods - /users", () => {
	test("test post method", async () => {
		const newUser = {
			username: "test-username",
			name: "test-name",
			password: "test-password",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-type", /application\/json/);

		const allUsers = await api.get("/api/users");
		expect(allUsers.body).toHaveLength(initialUsers.length + 1);
	});
});

describe("check error handling", () => {
	describe("username", () => {
		test("test empty username", async () => {
			const newUser = {
				name: "test-name",
				password: "test-password",
			};

			const result = await api.post("/api/users").send(newUser).expect(400);

			expect(result.text).toContain(
				"User validation failed: username: a username is required",
			);
		});

		test("test that username should be equal or greater than 3 characters", async () => {
			const newUser = {
				username: "te",
				name: "test-name",
				password: "test-password",
			};

			const result = await api.post("/api/users").send(newUser).expect(400);

			expect(result.text).toContain(
				"User validation failed: username: username should be longer than 3 characters",
			);
		});
	});

	describe("password", () => {
		test("test empty password", async () => {
			const newUser = {
				username: "test-username",
				name: "test-name",
			};

			const result = await api.post("/api/users").send(newUser).expect(400);

			expect(result.text).toContain(
				"User validation failed: password: a password is required",
			);
		});
	});
});
