const net = require('net')
const fs = require('fs/promises')
const config = require('../config.json')
const socket = net.createConnection({
  host: config.HOST,
  port: config.PORT
});


(async function () {
  const readFileHandler = await fs.open(config.FILE_SOURCE, 'r')
  const fileReadStream = readFileHandler.createReadStream()

  socket.on('data', (chunk) => {
  });


  fileReadStream.on('data', (chunk) => {
    socket.write(chunk)
  })

  fileReadStream.on('end', () => {
    readFileHandler.close();
    socket.end()
  })
})()
