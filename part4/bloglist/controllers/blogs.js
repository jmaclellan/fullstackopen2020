const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const { url, title, author, likes } = request.body

  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    url,
    title,
    author,
    user,
    likes,
  })

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title,
    author,
    url,
    likes,
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
