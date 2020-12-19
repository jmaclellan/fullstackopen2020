const http = require('http')
const app = require('./app') // actual Express app

const config = require('./utils/config')

const server = http.createServer(app)

const { PORT } = config
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
