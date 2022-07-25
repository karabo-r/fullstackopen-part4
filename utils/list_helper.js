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

const favoriteBlog = (blogs) =>{
	let bookWithHighestLikes = 0;
    let bookIndex = 0;
    blogs.forEach(element => {
        if (element.likes > bookWithHighestLikes) {
            bookIndex = blogs.indexOf(element)
        }
    });
    return blogs[bookIndex]
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
};
