const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
	username: {
		type: String,
		minLength: [3, "username should be longer than 3 characters"],
		unique: [true, "make the username unique"],
		required: [true, "a username is required"],
	},
	name: String,
	password: {
		type: String,
		required: [true, "a password is required"],
	},
});

// userSchema.statics.isUsernameInUse = async function(username){
// 	if(!username) throw new Error('Invalid username')
// 	try {
// 		const user = await this.findOne({username: username});
// 		if (user) {
// 			// console.log(user);
// 			this.message = new Error('nonoooo')
// 			return false;
// 		}
// 	} catch (error) {
// 		// console.log("method error - isUsernameInUse", error);
// 		return true;
// 	}
// };

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		(returnedObject.id = returnedObject._id.toString()),
			delete returnedObject._id,
			delete returnedObject.__v;
		delete returnedObject.password;
	},
});

module.exports = mongoose.model("User", userSchema);
