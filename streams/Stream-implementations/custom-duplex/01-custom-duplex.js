const { Duplex } = require('stream')
const fs = require('fs')
class customDuplex extends Duplex {
  constructor({ readHighWaterMark, writeHighWaterMark, readFile, writeFile }) {
    super({
      readableHighWaterMark:readHighWaterMark, 
      writableHighWaterMark:writeHighWaterMark
    })
    this.readHighWaterMark = readHighWaterMark;
    this.writeHighWaterMark = writeHighWaterMark;
    this.readFd = null;
    this.writeFd = null;
    this.readFile = readFile;
    this.writeFile = writeFile;
    this.chunks = [];
    this.chunksSize = 0;
  }
  _construct(callback) {
    fs.open(this.readFile, 'r', (err, fd) => {
      if (err) callback(err)
       this.readFd = fd;
       fs.open(this.writeFile, 'w', (err, fd) => {
        if (err) callback(err)
         else {
          this.writeFd = fd;
          callback();
        }
      })
    })
  }
  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunkSize += chunk.length;
    if (this.chunkSize >= this.writeHighWaterMark) {
      fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          callback(err)
        }
      })
      this.chunks = [];
      this.chunkSize = 0;
      callback()
    } else {
      callback()
    }
  }
  _read(size){ //size is highWaterMarkValue
    const buff = Buffer.alloc(size);
    fs.read(this.readFd, buff, 0, size, null, (err, bytesRead) =>{
      if (err) {
        return this.destroy(err) // instead of callback we need to use this method for error;
      }
      else{
        this.push(bytesRead > 0 ? buff.subarray(0,bytesRead): null)
      }
    })
  }
  _final(callback) {
    if (this.chunks.length > 0) {
      fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          callback(err);
        }else {
        this.chunkSize = 0;
        this.chunks = [];
        callback()
      }
      })
    }
    else 
    callback();
  }
}

const duplexStreams = new customDuplex({
  readHighWaterMark:2, 
  writeHighWaterMark:1,
  readFile:"read.txt", 
  writeFile:"duplex-write.txt"
})
duplexStreams.on('data', (chunk) =>{
  console.log(chunk)
  if (!duplexStreams.write(chunk)) {
    duplexStreams.pause();
  }
})
duplexStreams.on('drain', ()=>{
  duplexStreams.resume();
})
duplexStreams.on('end', ()=>{
  duplexStreams.end()
})
