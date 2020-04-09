const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()
const Blog = require('./../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find().populate('user')
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await Blog.create({
    ...body,
    user: user._id,
  })

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.json(blog.toJSON())
})

blogRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await blog.remove()
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: 'You are not authorized to delete this blog' })
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  })
  response.json(blog.toJSON())
})

module.exports = blogRouter
