(async function (params) {
  const fs = require('fs/promises')
 const writeFile = await fs.open("writeStream.txt", 'w')
 const readFile = await fs.open("bigFile.txt", 'r')
 const writeStreams = writeFile.createWriteStream()
 const readStreams = readFile.createReadStream()
 readStreams.on('data', (chunk) =>{
const str = chunk.toString().split(" ")
  //  if ( )/2 ==0 ) {
   if (!writeStreams.write(chunk)) {
    readStreams.pause();
   }
  
//  }
 })
 writeStreams.on('drain', ()=>{
  readStreams.resume()
 })
 readStreams.on('end', ()=>{
  readStreams.close()
  writeStreams.end()
 })
})()