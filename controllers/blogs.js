const blogRouter = require('express').Router()
const Blog = require('./../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find()
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })
  response.json(blog.toJSON())
})

module.exports = blogRouter
