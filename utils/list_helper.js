const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	let numberOfLikes = [];
	blogs.forEach((element) => {
		numberOfLikes.push(element.likes);
	});
	const totalNumberOfLikes = numberOfLikes.reduce((sum, item) => {
		return sum + item;
	}, 0);
	return totalNumberOfLikes;
};
module.exports = {
	dummy,
	totalLikes,
};
