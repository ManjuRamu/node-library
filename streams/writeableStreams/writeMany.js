
//fs sync 
// (async function () {
//   // Six core 
//   // CPU - 32%
//   // memory - 34 -41 Mb
//   // Execution time 27 - 30 sec
//   const fs = require("fs/promises")
//   console.time("witeManyFs")
//   const fileHandler = await fs.open("witeMany.txt",'w')
//   for (let i = 0; i<10000000;i++)
//    await  fileHandler.write(`${i} `)
//    console.timeEnd("witeManyFs")
// })()

// fs callback
// (function () {
//   const  fs  = require('node:fs')
//   const process = require('process')
//   console.time("witeManyFsCb")
//    // Six core 
//    // CPU - 22%
//    // memory - 45Mb //took lot memory can't check where it's too quick process
//    // Execution time: 2-3 secs
//   fs.open("writeManyCb.txt",'w',(err,fd) =>{
  
//     for (let i = 0; i<10000000;i++) //28.624s 
//      fs.writeSync(fd, `${i} `,()=>{})  // Execution time: fs.write  1.5 - 2secs numbers not in order;  goes to event loops
//      console.timeEnd("witeManyFsCb")
//   })
// })() 

//Not good practice which took lot memory usage. Cause memory leakage on big files
// (async function  () {
//   //Execution time : 745.626ms
//   //Memory usage : 10024 to 2021 MB
//   const fs = require('fs/promises')
//   const buf = Buffer.from(" a ",'utf-8')
//   console.time("witeManyStream")
//   const fileHandle = await fs.open('writeManyStreams.txt','w')
//   const stream = fileHandle.createWriteStream()
//   for (let i = 0;i<10000000;i++ ){ // If I add one more digit increase one it goes for memory leakage took almost 4 to 5GB memory
//       stream.write(buf)
//   }
//   // stream.on('close',()=>{
//     console.timeEnd("witeManyStream")
//   // })
 
// })()