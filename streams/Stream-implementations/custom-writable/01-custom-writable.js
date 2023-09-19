const { Writable } = require('stream')
const fs = require('fs')
class fileWriteStreams extends Writable {
  constructor({ hightWaterMarkValue, fileName }) {
    super({ highWaterMark: hightWaterMarkValue })
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunkSize = 0;
    this.hightWaterMarkValue = hightWaterMarkValue;
    this.writeCount = 0;
  }
  _construct(callback) {
    // this will pause all below method _write, _final, _destroy etc loading and write,end,on etc calling until callback get executed
    fs.open(this.fileName, 'w', (err, fd) => {
      if (err) {
        callback(err); // if we  pass any argument in callback it means stream object failed
      } else {
        this.fd = fd;
        callback() // if we didn't pass any argument in callback it means stream object get successful
      }
    })
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunkSize += chunk.length;
    if (this.chunkSize >= this.hightWaterMarkValue) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          callback(err)
        }
      })
      this.chunks = [];
      this.chunkSize = 0;
      ++this.writeCount;
      callback()
    } else {
      callback()
    }
  }
  _final(callback) {
    if (this.chunks.length > 0) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
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
  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error)
      })
    } else {
      callback(error)
    }
  }
}
const writeStreams = new fileWriteStreams({
  hightWaterMarkValue: 1024 * 5,
  fileName: "customWrite.txt"
})
writeStreams.write(Buffer.from("Som"))
writeStreams.write(Buffer.from("e new data added "))
writeStreams.write(Buffer.from("to it"))
writeStreams.end()
// writeStreams.destroy()
writeStreams.on('close', ()=>{
  console.log("streams closed")
})
writeStreams.on('finish', ()=>{
  console.log("streams finished")
})
