
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


//streams fileWrite
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



//Basics of streams -1
//stream.writableHighWaterMark = 16384 by defaults

// (async function  () {
//   //Execution time : 745.626ms
//   //Memory usage : 10024 to 2021 MB
//   const fs = require('fs/promises')
//   const buf = Buffer.from(" streams ",'utf-8')
//   // console.time("witeManyStream")
//   const fileHandle = await fs.open('writeManyStreams.txt','w')
//   const stream = fileHandle.createWriteStream()
//   // console.log(stream.writableHighWaterMark)  // default 16384 
//   console.log(stream.writableLength)         // while running 
//   stream.write(buf)
//   stream.write(buf)
//   stream.write(buf)
//   console.log("writableLength: ",stream.writableLength)  // length of buf * write() invokes we write   
// })()



//Basics of streams -2

// (async function  () {
//   //Execution time : 745.626ms
//   //Memory usage : 10024 to 2021 MB
//   const fs = require('fs/promises')
//   const buf = Buffer.alloc(16384, "a")
//   const fileHandle = await fs.open('writeManyStreams.txt','w')
//   const stream = fileHandle.createWriteStream()
//   // console.log(stream.writableHighWaterMark)  // default 16384 
//   console.log( stream.write(buf)) //buf length = 16383 then true & buf length > 16383 => false
//   console.log("writableLength: ",stream.writableLength) 
// })()

// stream drain events in streams to make stream free up memory 
// (async function () {
//   const fs = require('fs/promises')
//   const fileHandler = await fs.open("writeMany.txt",'w')
//   const streams  = fileHandler.createWriteStream()
//   const buf = Buffer.alloc(16384, "a")
//   streams.write(buf)

//   streams.on('drain', ()=>{
//     console.log("Safe to write in streams ",streams.writableLength)
//     streams.write(Buffer.alloc(2,"b"))
//     // streams.write(Buffer.alloc(streams.writableHighWaterMark), "a") //which make infinite callback of an drain event make sure
//   })
// })()

// streams write pretty enough creates 943 Mb file without memory leaks
(async function () {
  const fs = require("fs/promises")
  const fileHandler  = await fs.open("writeManyStreamsDrain.txt",'w')
  const streams = fileHandler.createWriteStream()
  let i = 0;
  function writeStream() {
    while (i< 10000000) {
    
     
      // Pause the stream write if inter-buffer is full i.e writableLength >=  writableHighWaterMark
      if (!streams.write(Buffer.from(` ${i} `)))
       break;
     
       //end the stream and close the fileHandler 
       if (i === 9999999) {
        streams.end()
        // fileHandler.close()
      }
      i++;
      
    }
  }
  writeStream()
  
   // after free up the internal buffer resume stream write
  streams.on('drain', ()=>{
    writeStream()
  })
  streams.on('finish',()=>{
    fileHandler.close()
  })
})()