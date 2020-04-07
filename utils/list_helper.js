const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((prev, curr) => prev + curr.likes, 0)

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const maxLikes = Math.max(...likes)
  return blogs.find((blog) => blog.likes === maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
