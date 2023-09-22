const net = require('net');
const readLine = require('node:readline/promises');
const rl = readLine.createInterface({
  input: process.stdin, 
  output: process.stdout
})
let myId ;
function clearLine(direction = 0) {
   return new Promise((resolve, reject) =>{
    process.stdout.clearLine(direction, ()=>{
    resolve();
    })
   })
}
async function ask(question = "Write a message > ") {
  const message = await rl.question(question);
  socket.write(JSON.stringify({
    fromId:myId, 
    message
   }))
  await moveCursor(0, -1);
  await clearLine()

}
function moveCursor(dx, dy) {
  return new Promise((resolve, reject) =>{
    process.stdout.moveCursor(dx, dy, ()=>{
      resolve();
    })
  })
}
const config = require('./config.json')
const socket = net.createConnection({
  host: config.HOST, 
  port:config.PORT
},
 async () =>{
  //  console.log("connected to server!")
  //  await ask("Write a message > ")
}) 

socket.on('data',async (chunk) =>{ 
  const data = JSON.parse(chunk.toString('utf-8'));
  try {
    if (data.clientId) {
      myId = data.clientId;
      console.log("your id : ", myId)
      ask()
    }
    else {
      await clearLine()
      await moveCursor(0, 0)
      console.log(`${data.fromId == myId ? "you" :data.fromId}: ${data.message}`)
      await ask()
    }   
  
   
} catch (error) {
  
}

 
})

socket.on('close', ()=>{
  console.log("server closed")
  process.exit(1)
})
socket.on('end', ()=>{
  console.log("server end")
})

socket.on('error', (error)=>{
  console.log("getting error from server \n ")
})