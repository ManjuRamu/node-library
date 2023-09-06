(async function  () {
  //Execution time : 745.626ms
  //Memory usage : 10024 to 2021 MB
  const fs = require('fs/promises')
  const buf = Buffer.alloc(16384, "a")
  const fileHandle = await fs.open('writeManyStreams.txt','w')
  const stream = fileHandle.createWriteStream()
  // console.log(stream.writableHighWaterMark)  // default 16384 
  console.log( stream.write(buf)) //buf length = 16383 then true & buf length > 16383 => false
  console.log("writableLength: ",stream.writableLength) 
})()