(async function () {
  const fs = require('fs/promises')
  const fileHandle = await fs.open('writeManyStreamsDrain.txt', 'r')
  const streams = fileHandle.createReadStream({ //modified high water 
    highWaterMark:64*1024 
  })
  //came as chuck default highWaterMarkValue 64kb  
  streams.on('data',(chunk) =>{
    console.log("data",chunk.toString('utf-8'))
  })
  // after end it close the stream 
  streams.on('close' , ()=>{
    console.log("close of an stream")
  })
  // first it end 
  streams.on('end' , ()=>{
    console.log("end of an stream")
  })
  
  streams.on('error' , ()=>{
    console.log("error of an stream")
  })
})()