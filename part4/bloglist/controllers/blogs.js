const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  })

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
