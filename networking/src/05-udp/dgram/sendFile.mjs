import fs from 'fs/promises';
const fileReadHandle = await fs.open("../../04-file-uploader/sources/big-1gb.mp4");
const readStream = fileReadHandle.createReadStream();
readStream.on('data', (chunk) =>{

})
