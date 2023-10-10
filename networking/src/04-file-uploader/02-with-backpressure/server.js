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
      if (!fileWriteStream.write(chunk)) {
        socket.pause();
        // socket.write('pause')
      }
     else socket.resume()
    }
    else{
      if (!fileWriteStream.write(chunk)) {
        socket.pause()
        // socket.write('pause')
      }
    }

    fileWriteStream?.on('drain', ()=>{
      // socket.write('resume')
      // console.log("resume")
      socket.resume()
    })
   
  })
  
  

  socket.on('end', () => {
    console.log("connection ended!")
    fileWriteHandle.close()
  })
})
server.listen(config.PORT, config.HOST, () => {
  console.log(server.address())
})