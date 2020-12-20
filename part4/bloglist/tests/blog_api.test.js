const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('get correct number of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toStrictEqual({})
})

afterAll(() => {
  mongoose.connection.close()
})
