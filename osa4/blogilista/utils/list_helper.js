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
    const maxKey = lodash.max(Object.keys(counted), function (o) {return counted[o]})

    return { author: maxKey, blogs: counted[maxKey]}
}

const mostLikes = (blogs) => {
    let mostLikes = 0
    let author = ''
    const grouped = lodash.groupBy(blogs, 'author')
    lodash.forEach(grouped, function(value, key) {
        const reducer = (sum, item) => {
            return sum + item.likes
        }

        const likes = value.reduce(reducer, 0)

        if (likes > mostLikes) {
            mostLikes = likes
            author = key
        }
    })

    return { author: author, likes: mostLikes }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}