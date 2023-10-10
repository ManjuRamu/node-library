const net = require('net')
const fs = require('fs/promises')
const config = require('../config.json')

const server = net.createServer()
async function openFile(filePath) {
  return await fs.open(filePath, 'w')
}
let fileWriteHandle, fileWriteStream;
server.on('connection', (socket) => {

  socket.on('data', async (chunk) => {
    if (!fileWriteHandle) {
      socket.pause()
      fileWriteHandle = await openFile(config.FILE_DESTINATION)
      fileWriteStream = fileWriteHandle.createWriteStream()
      fileWriteStream?.on('drain', ()=>{
        socket.resume()
      })
      if (!fileWriteStream.write(chunk)) {
        socket.pause();
      }
     else socket.resume()
    }
    else{
      if (!fileWriteStream.write(chunk)) 
        socket.pause()
    }
  })
  
  socket.on('end',async () => {
    console.log("connection ended!")
    await fileWriteHandle.close()
    fileWriteHandle = undefined;
    socket.end()
  })
})
server.listen(config.PORT, config.HOST, () => {
  console.log(server.address())
})