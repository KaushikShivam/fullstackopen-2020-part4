const Blog = require('./../models/blog')

const initialBlogs = [
  {
    title: 'blog 1',
    author: 'author 1',
    url: 'www.blog1.com',
    likes: 25,
  },
  {
    title: 'blog 2',
    author: 'author 2',
    url: 'www.blog2.com',
    likes: 25,
  },
  {
    title: 'blog 3',
    author: 'author 3',
    url: 'www.blog3.com',
    likes: 25,
  },
  {
    title: 'blog 4',
    author: 'author 4',
    url: 'www.blog4.com',
    likes: 25,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find()
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
