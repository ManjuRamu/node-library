const net = require('net')
const config =require('./config.json');

const server = net.createServer();

server.listen(config.PORT, config.HOST , ()=>{
  console.log("server open on ", server.address())
})
let allClients = []
server.on('connection', (socket) =>{
  let clientId = allClients.length+1;

  socket.write(JSON.stringify({clientId}))
 allClients.forEach((client) =>{
  client.socket.write(JSON.stringify({
    fromId:clientId,
    message: "joined!"
  }))
 }) 
 allClients.push({clientId, socket})
 socket.on('data', (chunk) =>{
  allClients.forEach(client =>client.socket.write(chunk))
})

 
 
  socket.on('close', ()=>{
   console.log("client closed")
    const leftChat = allClients.find( client => client.socket == socket);
    allClients.splice(allClients.indexOf(leftChat), 1)
    allClients.forEach(client =>{
      client.socket.write(JSON.stringify({fromId :leftChat.clientId, message:"left the chat!"}))
    });
    // allClients.filter((client) =>{
    //  if (client.socket != socket) {
    //    client.socket.write(`${client.clientId} left the chat`)
    //  }
    //  return client.socket != socket;
    // })
  })


 socket.on('end', ()=>{
  // allClients =  allClients.filter((client) => client != socket)
  console.log("client ended")
 })


 socket.on('error', ()=>{
  // allClients =  allClients.filter((client) => client != socket)
  console.log("client error")
 })
//  socket.write(Buffer.from("connected to server"))
})
