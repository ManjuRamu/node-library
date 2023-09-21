//lowest network module, http, ssh 
// are higher build on net module
const net = require('net')
const config = require('./config.json')
const server = net.createServer((socket) => {
  //socket is a streams. Once any client connect to this server create new socket.
  socket.on('data', (chuck) => {
    console.log(chuck.toString('utf-8'));
    socket.write(Buffer.from("data received"))
  })
 
  socket.write(Buffer.from("connected to server"))
})
server.listen(config.PORT, config.HOST, () => {
  console.log(`tcp server running on `, server.address())
})