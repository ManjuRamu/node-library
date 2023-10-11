const dgram = require('dgram');
const receiver = dgram.createSocket('udp4');
receiver.on('message', (msg, recInfo)=>{
  console.log(`got "${msg}" from ${recInfo.address}, ${recInfo.port}, ${recInfo.family}`)
})
receiver.bind({
  port:3000, 
  address: "127.0.0.1"
})
receiver.on('listening', ()=>{
  console.log(receiver.address())
})