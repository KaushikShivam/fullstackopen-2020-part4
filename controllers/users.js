const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Password must be atleast 3 characters long' })
  }

  const passwordHash = await bcrypt.hash(body.password, 12)

  const user = await User.create({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  response.status(201).json(user)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find().populate('blogs')
  response.status(200).json(users.map((user) => user.toJSON()))
})

module.exports = usersRouter
