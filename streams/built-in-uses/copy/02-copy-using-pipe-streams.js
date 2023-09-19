const fs = require('fs/promises');
const { pipeline } = require('stream');

//Faster than fs.read() =>  chunk to stream write
// (async function () {
//     const readFile = await fs.open("bigFile.txt", 'r')
//     const writeFile = await fs.open('copy.txt', 'w')
//     const readStreams = readFile.createReadStream();
//     const writeStream = writeFile.createWriteStream();
//     readStreams.pipe(writeStream);
//     readStreams.on('close', ()=>{
//         console.log("readStreams closed")
//         readFile.close()
//     })
//     readStreams.on('end', ()=>{
//         console.log("readStreams ended")
//     })
//     writeStream.on('end', ()=>{
//         console.log("writeStream ended")
//     })
//     writeStream.on('close', ()=>{
//         console.log("writeStream closed")
//         writeFile.close()
//     })
// })()

//pipeline for error handling in stream pipe
(async function () {
    const readFile = await fs.open("bigFile.txt", 'r')
    const writeFile = await fs.open('copy.txt', 'w')
    const readStreams = readFile.createReadStream();
    const writeStream = writeFile.createWriteStream();
    readStreams.pipe(writeStream);
    pipeline(readStreams, writeStream, (err) =>{
      if(err) console.log("streams get failed: "+err)
    })
    readStreams.on('close', ()=>{
        console.log("readStreams closed")
        readFile.close()
    })
    readStreams.on('end', ()=>{
        console.log("readStreams ended")
    })
    writeStream.on('end', ()=>{
        console.log("writeStream ended")
    })
    writeStream.on('close', ()=>{
        console.log("writeStream closed")
        writeFile.close()
    })
})()