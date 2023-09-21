const net = require('net')
const config = require('./config.json')
const socket = net.createConnection({
  host: config.HOST,
  port: config.PORT,
}, () => {
  setInterval(() => {
    socket.write(Buffer.from("simple data sending"))
  }, 3000);
  socket.on('data', (data)=>{
    console.log(data.toString('utf-8'))
  })

})
