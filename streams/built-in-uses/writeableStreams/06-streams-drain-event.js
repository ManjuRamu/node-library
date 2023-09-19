// stream drain events in streams to make stream free up memory 
(async function () {
  const fs = require('fs/promises')
  const fileHandler = await fs.open("writeMany.txt",'w')
  const streams  = fileHandler.createWriteStream()
  const buf = Buffer.alloc(16384, "a")
  streams.write(buf)

  streams.on('drain', ()=>{
    console.log("Safe to write in streams ",streams.writableLength)
    streams.write(Buffer.alloc(2,"b"))
    // streams.write(Buffer.alloc(streams.writableHighWaterMark), "a") //which make infinite callback of an drain event make sure
  })
})()