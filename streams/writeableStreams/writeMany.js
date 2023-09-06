
//fs sync 
(async function () {
  // Six core 
  // CPU - 32%
  // memory - 34 -41 Mb
  // Execution time 27 - 30 sec
  const fs = require("fs/promises")
  console.time("witeManyFs")
  const fileHandler = await fs.open("witeMany.txt",'w')
  for (let i = 0; i<10000000;i++)
   await  fileHandler.write(`${i} `)
   console.log("process: "+ JSON.stringify(process.memoryUsage()))
   console.timeEnd("witeManyFs")
})()

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
  
//     for (let i = 0; i<10000000;i++)
//      fs.writeSync(fd, `${i} `,()=>{})  // Execution time: fs.write  1.5 - 2secs numbers not in order;  goes to event loops
//      console.log({fd},"process: "+ JSON.stringify(process.memoryUsage()))
//      console.timeEnd("witeManyFsCb")
//   })
// })() 