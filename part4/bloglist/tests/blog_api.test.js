const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs save', () => {
  test('get correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    debugger

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('addition of a new blog', () => {
  test('succeed with valid data', async () => {
    const newBlog = {
      title: 'test blog 1',
      author: 'joe schmoe',
      url: 'website.com',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
