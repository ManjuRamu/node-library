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
      ++this.writeCount;
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
    console.log("number of writes "+this.writeCount)
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error)
      })
    } else {
      callback(error)
    }
  }
}


// streams write pretty enough creates 943 Mb file without memory leaks
  const streams = new fileWriteStreams({
    hightWaterMarkValue:1024*10, //5 writes = 193140; 10 writes = 96570
    fileName:"custom-write-big.txt"
  })
  let i = 0;
  function writeStream() {
    while (i< 100000000) {
      // Pause the stream write if inter-buffer is full i.e writableLength >=  writableHighWaterMark
      if (!streams.write(Buffer.from(` ${i} `)))
       break;
       i++;
       //end the stream and close the fileHandler 
      if (i == 100000000) { // 69584441  
        streams.end()
      }
    }
  }
  writeStream()
  
   // after free up the internal buffer resume stream write
  streams.on('drain', ()=>{
    writeStream()
  })
  