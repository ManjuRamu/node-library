const {Transform} = require('stream')
const fs = require('fs/promises')
class Decrypt extends Transform{
  _transform(chunk, encoding, callback){
    chunk.forEach((chu,i)=>{
      if (chu != 255) {
        chunk[i] = chu-1
      }
    })
    this.push(chunk)
 // _write method overriding
  }
}
(async function () {
  const readFileHandle = await fs.open('write.txt', 'r');
  const writeFileHandle = await fs.open('decrypt.txt','w');
 const readStream = readFileHandle.createReadStream();
 const writeStream = writeFileHandle.createWriteStream();
 const decrypt = new Decrypt();
 readStream.pipe(decrypt).pipe(writeStream);
})()