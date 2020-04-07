const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((prev, curr) => prev + curr.likes, 0)

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const maxLikes = Math.max(...likes)
  return blogs.find((blog) => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const result = _(blogs)
    .groupBy('author')
    .map((items, author) => ({ author, count: items.length }))
    .maxBy('count')
  return result
}

const mostLikes = (blogs) => {
  return _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => {
      let likes = 0
      _.each(blogs, (blog) => {
        likes += blog['likes']
      })
      return {
        author: author,
        likes: likes,
      }
    })
    .orderBy('likes', 'desc')
    .first()
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
