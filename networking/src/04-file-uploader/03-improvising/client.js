const net = require('net')
const fs = require('fs/promises')
const path = require('path')
const process = require('process')
const config = require('../config.json')

function clearLine(direction = 0) {
  return new Promise((resolve, reject) =>{
   process.stdout.clearLine(direction, ()=>{
   resolve();
   })
  })
}
function moveCursor(dx, dy) {
  return new Promise((resolve, reject) =>{
    process.stdout.moveCursor(dx, dy, ()=>{
      resolve();
    })
  })
}
const socket = net.createConnection({
  host: config.HOST,
  port: config.PORT
}, async () => {
  let fileName, fileReadStream, fileSize, uploadPercentage = 0, bytesUploaded = 0;
  const filePath = process.argv[2]
  fileName = path.basename(filePath);
  socket.write(JSON.stringify({ fileName }));
  // current folder file
  const readFileHandler = await fs.open(config.FILE_SOURCE.replace(path.basename(config.FILE_SOURCE), fileName), 'r')
   // from any place - complete path required
  //  const readFileHandler = await fs.open(filePath, 'r');
   fileSize = (await readFileHandler.stat()).size; // in bytes
  fileReadStream = readFileHandler.createReadStream()
  let previous = 0
  fileReadStream.on('data', (chunk) => {
    if (!socket.write(chunk)) {
      fileReadStream.pause();
    }
    bytesUploaded+=chunk.length;
    uploadPercentage = Math.floor((bytesUploaded/fileSize)*100) 
   if (previous != uploadPercentage) {
    if (previous != 0) {
    moveCursor(0, -1)
    clearLine(0)
    }  
    console.log("uploading.... "+uploadPercentage+"%") 
    previous = uploadPercentage
   }  
  })
  
  socket.on('drain', () => {
    fileReadStream.resume()
  })
  
  fileReadStream?.on('end', () => {
    readFileHandler.close();
    socket.end()
  })

});


// async function openFile(filePath) {
//   return await fs.open(filePath, 'r')
// }
// let readFileHandler;

