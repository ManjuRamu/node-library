const http = require('http')
const port = 3000;

/* server not running with localhost or 127.0.0.1 
working on my wifi/IPS network provider interface 
with my private ip  */
const hostname = "192.168.6.19" 
const server = http.createServer((req, res)=>{
  const data ={message:"Server working fine!"}
  res.setHeader("Content-type", "application/json")
  res.setHeader("Connection", "close");
  res.statusCode = 200;
  res.end(JSON.stringify(data));
 
})
server.listen(port, hostname , ()=>{
  console.log(`http://${hostname}:${port}`)
})