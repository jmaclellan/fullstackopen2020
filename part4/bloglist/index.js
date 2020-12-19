const http = require('http')
const express = require('express')

const cors = require('cors')
const app = require('./app') // actual Express app

const server = http.createServer(app)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
