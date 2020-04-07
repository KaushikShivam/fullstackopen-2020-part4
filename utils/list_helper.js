const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((prev, curr) => prev + curr.likes, 0)

module.exports = {
  dummy,
  totalLikes,
}
