const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()
  for (const blog of helper.initialBlogs) {
    await Blog.create(blog)
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier id is defined', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('a blog is created successfully', async () => {
  const newBlog = {
    title: 'yolo',
    author: 'author 5',
    url: 'www.blog5.com',
    likes: 25,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map((n) => n.title)
  expect(contents).toContain('yolo')
})

test('likes property defaults to 0', async () => {
  const newBlog = {
    title: 'yolo',
    author: 'author 5',
    url: 'www.blog5.com',
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map((n) => n.title)
  expect(contents).toContain('yolo')

  expect(response.body.likes).toBe(0)
})

test('blog without content is not added', async () => {
  const newBlog = {
    author: 'author 5',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog is deleted successfully', async () => {
  const blogs = await helper.blogsInDb()
  const blogToDelete = blogs[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('blog is updated successfully', async () => {
  const blogs = await helper.blogsInDb()
  const blogToUpdate = blogs[0]

  const newBlog = { ...blogToUpdate, title: 'updated blog' }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)

  expect(response.body.title).toBe('updated blog')
})

afterAll(() => {
  mongoose.connection.close()
})
