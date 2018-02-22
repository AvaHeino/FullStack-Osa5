const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, blog) => {
		return sum + blog.likes
	}
	return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
	//find the largest amount of likes 
	amountsOfLikes = blogs.map(x => x.likes)
	const largestAmountOfLikes = amountsOfLikes.reduce(function(a, b) {
		return Math.max(a, b)
	})
	

	//find  the blog with the largest amounts of likes
	const blogWithMostLikes = blogs.find(function(blog) {
		return blog.likes === largestAmountOfLikes
	})
	

	return blogWithMostLikes
}

module.exports = {
	dummy,
	favouriteBlog,
	totalLikes
}

