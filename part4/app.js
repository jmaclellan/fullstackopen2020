const mongoose = require('mongoose')

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
