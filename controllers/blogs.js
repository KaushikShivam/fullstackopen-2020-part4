const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()
const Blog = require('./../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find().populate('user')
  response.json(blogs.map((blog) => blog.toJSON()))
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = Blog.create({
    ...body,
    user: user._id,
  })

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.json(blog.toJSON())
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
