(async function (params) {
  const fs = require('fs/promises')
 const writeFile = await fs.open("writeStream.txt", 'w')
 const readFile = await fs.open("read-big.txt", 'r')
 const writeStreams = writeFile.createWriteStream()
 const readStreams = readFile.createReadStream()
 readStreams.on('data', (chunk) =>{
  writeStreams.write(chunk)
 })
 readStreams.on('end', ()=>{
  readStreams.close()
  writeStreams.end()
 })
})()