const blogRouter = require('express').Router()
const Blog = require('./../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find()
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
  const blog = await Blog.create(request.body)
  response.status(201).json(blog.toJSON())
})

module.exports = blogRouter
