const net = require('net')
const fs = require('fs/promises')
const path = require('path')
const config = require('../config.json')
let fileName, fileReadStream;
const socket = net.createConnection({
  host: config.HOST,
  port: config.PORT
}, async () => {
  const filePath = process.argv[2]
  fileName = path.basename(filePath);
  socket.write(JSON.stringify({ fileName }));
  // const readFileHandler = await fs.open(config.FILE_SOURCE.replace(path.basename(config.FILE_SOURCE), fileName), 'r')
  const readFileHandler = await fs.open(filePath, 'r')
  fileReadStream = readFileHandler.createReadStream()


});

fileReadStream.on('data', (chunk) => {
  if (!socket.write(chunk)) {
    fileReadStream.pause();
  }
})

socket.on('drain', () => {
  fileReadStream.resume()
})

fileReadStream?.on('end', () => {
  readFileHandler.close();
  socket.end()
})
// async function openFile(filePath) {
//   return await fs.open(filePath, 'r')
// }
// let readFileHandler;

