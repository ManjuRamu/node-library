(async function (params) {
  const fs = require('fs/promises')
 const writeFile = await fs.open("even-numbers.txt", 'w')
 const readFile = await fs.open("bigFile.txt", 'r')
 const writeStreams = writeFile.createWriteStream()
 const readStreams = readFile.createReadStream()
 readStreams.on('data', (chunk) =>{
const numbers = chunk.toString().split("  ")
//error checks
console.log("--------------FIRST-START----------------")
console.log(numbers[0])
console.log("--------------FIRST-END----------------")
console.log("--------------LAST-START-----------------")
console.log(numbers[numbers.length -3])
console.log(numbers[numbers.length -2])
console.log(numbers[numbers.length -1])
console.log("--------------LAST-END-----------------")
numbers.map((num) => {
  num = num.replace(/ /g,"" )
  if (parseInt(num) % 2 == 0) {
    if (!writeStreams.write(num+" ")) {
     readStreams.pause();
    }
  }
})
  
 })
 writeStreams.on('drain', ()=>{
  readStreams.resume()
 })
 readStreams.on('end', ()=>{
  readStreams.close()
  writeStreams.end()
 })
})()