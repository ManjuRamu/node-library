const net = require('net')
const fs = require('fs/promises')
const config = require('../config.json')

const server = net.createServer()
server.on('connection', async (socket) => {
  const fileWriteHandle = await fs.open(config.FILE_DESTINATION, 'w')
  fileWriteStream = fileWriteHandle.createWriteStream()
  socket.on('data', (chunk) => {
    console.log(chunk)
    fileWriteStream.write(chunk)
  })
  socket.on('end', () => {
    console.log("connection ended!")
    fileWriteHandle.close()
  })
})
server.listen(config.PORT, config.HOST, () => {
  console.log(server.address())
})