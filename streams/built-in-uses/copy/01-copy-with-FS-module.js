(
  async function () {
    const fs = require('fs/promises')
    //   fs.readFile can't good for larger files it took lot memory and max it can read is 2GB;
    const readFile = await fs.open('bigFile.txt', 'r');
    const writefile = await fs.open("copy.txt", 'w');
    while (true) {
    const readData =  await readFile.read()
    if (readData.bytesRead == 0) break;
    // gives buffer container length 
    if (readData.bytesRead != 16384)//complete buffer container length 16384
    //last container contains 0's after no data to fill the buffer container   
    {
      // run =false;
      writefile.write(readData.buffer.subarray(0, readData.bytesRead-1))
     // another way by copy data to other buffer
      //  const indexOfNotFilled = readData.buffer.indexOf(0)
      // const newBuffer = Buffer.alloc(indexOfNotFilled)
      // readData.buffer.copy(newBuffer, 0, 0, indexOfNotFilled)
      // writefile.write(newBuffer);
      }
    else
    writefile.write(readData.buffer) // gives buffer
  }
  readFile.close()
  writefile.close();
  }
)()