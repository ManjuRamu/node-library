const net = require('net')
const fs = require('fs/promises')
const config = require('../config.json')
const socket = net.createConnection({
  host: config.HOST,
  port: config.PORT
});
// async function openFile(filePath) {
//   return await fs.open(filePath, 'r')
// }
// let readFileHandler;

(async function () {
  const readFileHandler = await fs.open(config.FILE_SOURCE, 'r')
  const fileReadStream = readFileHandler.createReadStream()

  socket.on('data', (chunk) => {
    // if (chunk.toString() === 'pause') {
    //   fileReadStream.pause();
    // }
    // else if (chunk.toString() === 'resume') {
    //   fileReadStream.resume()
    // }
  });

  fileReadStream.on('data', (chunk) => {
    if (!socket.write(chunk)) {
      fileReadStream.pause();
    }
  })
socket.on('drain', ()=>{
  fileReadStream.resume()
})

  fileReadStream.on('end', () => {
    readFileHandler.close();
    socket.end()
  })
})()
