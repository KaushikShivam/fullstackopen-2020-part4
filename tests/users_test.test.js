const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany()
  for (const user of helper.initialUsers) {
    await User.create(user)
  }
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of users are returned', async () => {
  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(helper.initialUsers.length)
})

test('a blog is created successfully', async () => {
  const user = {
    username: 'testuser',
    name: 'test',
    password: 'password',
  }
  await api
    .post('/api/users')
    .send(user)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)

  const contents = usersAtEnd.map((n) => n.name)
  expect(contents).toContain('test')
})

describe('invalid additions', () => {
  test('without password', async () => {
    const newUser = {
      username: 'test u',
      name: 'test',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.error).toContain(
      'Password must be atleast 3 characters long'
    )

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('with password length less than 3', async () => {
    const newUser = {
      username: 'test u',
      name: 'test',
      password: 'p',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.error).toContain(
      'Password must be atleast 3 characters long'
    )

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'userOne',
      name: 'user 1',
      password: 'password',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
