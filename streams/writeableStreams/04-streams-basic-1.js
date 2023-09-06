//stream.writableHighWaterMark = 16384 by default

(async function  () {
  //Execution time : 745.626ms
  //Memory usage : 10024 to 2021 MB
  const fs = require('fs/promises')
  const buf = Buffer.from(" streams ",'utf-8')
  // console.time("witeManyStream")
  const fileHandle = await fs.open('writeManyStreams.txt','w')
  const stream = fileHandle.createWriteStream()
  // console.log(stream.writableHighWaterMark)  // default 16384 
  console.log(stream.writableLength)         // while running 
  stream.write(buf)
  stream.write(buf)
  stream.write(buf)
  console.log("writableLength: ",stream.writableLength)  // length of buf * write() invokes we write   
})()