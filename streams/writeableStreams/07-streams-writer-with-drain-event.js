// streams write pretty enough creates 943 Mb file without memory leaks
(async function () {
  const fs = require("fs/promises")
  const fileHandler  = await fs.open("writeManyStreamsDrain.txt",'w')
  const streams = fileHandler.createWriteStream()
  let i = 0;
  function writeStream() {
    while (i< 100000000) {
      // Pause the stream write if inter-buffer is full i.e writableLength >=  writableHighWaterMark
      if (!streams.write(Buffer.from(` ${i} `)))
       break;
       i++;
       //end the stream and close the fileHandler 
      if (99999999) {
        streams.end()
        fileHandler.close()
      }
    }
  }
  writeStream()
  
   // after free up the internal buffer resume stream write
  streams.on('drain', ()=>{
    writeStream()
  })
})()