//streams fileWrite
//Not good practice which took lot memory usage. Cause memory leakage on big files

(async function  () {
  //Execution time : 745.626ms
  //Memory usage : 10024 to 2021 MB
  const fs = require('fs/promises')
  const buf = Buffer.from(" a ",'utf-8')
  console.time("witeManyStream")
  const fileHandle = await fs.open('writeManyStreams.txt','w')
  const stream = fileHandle.createWriteStream()
  for (let i = 0;i<10000000;i++ ){ // If I add one more digit increase one it goes for memory leakage took almost 4 to 5GB memory
      stream.write(buf)
  }
  // stream.on('close',()=>{
    console.timeEnd("witeManyStream")
  // })
 
})()