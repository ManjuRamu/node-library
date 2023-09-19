const {Transform} = require('stream')
const fs = require('fs/promises')
class Encrypt extends Transform{
  _transform(chunk, encoding, callback){
    chunk.forEach((chu,i)=>{
      if (chu != 255) {
        chunk[i] = chu+1
      }
    })
    this.push(chunk)
 // _write method overriding
  }
}
(async function () {
  const readFileHandle = await fs.open('read.txt', 'r');
  const writeFileHandle = await fs.open('write.txt','w');
 const readStream = readFileHandle.createReadStream();
 const writeStream = writeFileHandle.createWriteStream();
 const encrypt = new Encrypt();
 readStream.pipe(encrypt).pipe(writeStream);
})()