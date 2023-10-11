const dgram = require('dgram');
const sender = dgram.createSocket('udp4');
sender.send("some data",3000 , "127.0.0.1", (err) =>{
  console.log(err);
  sender.close()
})

