const {Readable} = require('stream');
const fs = require('fs')
class fileReadStreams extends Readable{
  constructor({highWaterMarkValue, fileName }){
   super({highWaterMark:highWaterMarkValue})
   this.fileName = fileName;
   this.highWaterMark = highWaterMarkValue;
   this.fd = null;
  }
  _construct(callback){
    fs.open(this.fileName,'r' ,(err,fd)=>{
      this.fd = fd;     
      callback(err)
    })
  }
  _read(size){ //size is highWaterMarkValue
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) =>{
      if (err) {
        return this.destroy(err) // instead of callback we need to use this method for error;
      }
      else{
        this.push(bytesRead > 0 ? buff.subarray(0,bytesRead): null)
      }
    })
  }
  _destroy(error ,callback){
    if (this.fd) {
      fs.close(this.fd, (err) =>{
        callback(err);
      })
    }else callback(error)
  }
}

const readStream = new fileReadStreams({
  highWaterMarkValue:2,
  fileName:"read.txt"
})
readStream.on('data', (chunk) =>{
  console.log({chunk:chunk.toString()})
})
readStream.on('end', ()=>{
  console.log("reading data completed")
})