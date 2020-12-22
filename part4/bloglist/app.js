const mongoose = require('mongoose')
const express = require('express')

const app = express()
const cors = require('cors')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

app.use(cors())
app.use(express.json())

app.use('/api/user', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

module.exports = app
