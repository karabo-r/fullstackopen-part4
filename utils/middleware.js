const jwt = require("jsonwebtoken");

function tokenExtractor(request, response, next) {
	const Authorization = request.get("Authorization");
	if (Authorization && Authorization.toLowerCase().startsWith("bearer ")) {
		request.token = Authorization.substring(7);
	}
	next();
}

function userExtractor(request, response, next) {
	const decodedToken = jwt.verify(request.token, process.env.TOKEN_KEY);
	request.user = decodedToken.id;
	next();
}

module.exports = { tokenExtractor, userExtractor };
