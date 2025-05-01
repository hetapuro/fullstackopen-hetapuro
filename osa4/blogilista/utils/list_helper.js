const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    var maxLikes = 0
    var maxIndex = 0

    blogs.forEach((blog, index) => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            maxIndex = index
        }
    })

    return blogs[maxIndex]
} 

const mostBlogs = (blogs) => {
    const counted = lodash.countBy(blogs, 'author')
    console.log(counted)

    const mapValues = lodash.mapValues(blogs, 'author')
    console.log(mapValues)

}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}