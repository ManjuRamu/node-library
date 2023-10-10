const http = require('http')
const port = 3000;
const fs = require('fs/promises')

/* server not running with localhost or 127.0.0.1 
working on my wifi/IPS network provider interface 
with my private ip  */
const hostname = "192.168.6.19" 
  
const server = http.createServer(async (req, res)=>{
  
  let fileHandle = await fs.open("../04-file-uploader/sources/big-1gb.mp4", 'r');
  let fileReadStream = fileHandle.createReadStream() 
  fileReadStream.on('data', (chunk) =>{
    if (!res.write(chunk)) {
      // fileReadStream.pause()
    }
  })
  // res.on('drain', () =>{
  //   fileReadStream.resume()
  // } )
  // const data ={message:"Server working fine!"}
  res.setHeader("Content-type", "video/mp4")
  res.setHeader("Connection", "close");
  res.statusCode = 200;
  fileReadStream.on('end', ()=>{
    console.log("completed")
    res.end();
    fileHandle.close()
    fileReadStream.close()
    fileHandle = undefined;
    fileReadStream = undefined;
  })
 
})
server.listen(port, hostname , ()=>{
  console.log(`http://${hostname}:${port}`, server.address())
})