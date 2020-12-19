const mongoose = require('mongoose')
const express = require('express')

const app = express()
const cors = require('cors')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

app.use(cors())
app.use('/api/blogs', blogsRouter)

module.exports = app
