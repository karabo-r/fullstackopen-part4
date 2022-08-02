function tokenExtractor(request, response, next) {
	const Authorization = request.get("Authorization");
	if (Authorization && Authorization.toLowerCase().startsWith("bearer ")) {
		request.token = Authorization.substring(7);
	}
	next();
}

module.exports = { tokenExtractor };
