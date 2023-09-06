// streams write pretty enough creates 943 Mb file without memory leaks
(async function () {
  const fs = require("fs/promises")
  const fileHandler  = await fs.open("writeManyStreamsDrain.txt",'w')
  const streams = fileHandler.createWriteStream()
  let i = 0;
  function writeStream() {
    while (i< 100000000) {
      if (!streams.write(Buffer.from(` ${i} `)))
       break;
      i++;
    }
  }
  writeStream()
  streams.on('drain', ()=>{
    writeStream()
  })
})()