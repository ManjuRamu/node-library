const net = require('net')
const fs = require('fs/promises')
const path = require('path')
const config = require('../config.json')

const server = net.createServer()

async function openFile(filePath) {
  return await fs.open(filePath, 'w')
}
let fileWriteHandle, fileWriteStream, fileName;;
server.on('connection', (socket) => {

  socket.on('data', async (chunk) => {
    try {
     fileName = JSON.parse(chunk.toString()).fileName;
     socket.pause()
     fileWriteHandle = await openFile(config.FILE_DESTINATION.replace(path.basename(config.FILE_DESTINATION), fileName))
     fileWriteStream = fileWriteHandle.createWriteStream();
     socket.resume();
     fileWriteStream.on('drain', () => {
       socket.resume()
     })
    } catch (error) {
        if(!fileWriteStream.write(chunk))
          socket.pause()
      }
  })

  socket.on('end', async () => {
    console.log("connection ended!")
    await fileWriteHandle.close() 
    fileWriteStream = undefined;
    fileWriteHandle = undefined;
    socket.end()
  })
})
server.listen(config.PORT, config.HOST, () => {
  console.log(server.address())
})