(async function (params) {
  const fs = require('fs/promises')
  const writeFile = await fs.open("even-numbers.txt", 'w')
  const readFile = await fs.open("read-big.txt", 'r')
  const writeStreams = writeFile.createWriteStream()
  const readStreams = readFile.createReadStream()
  let previousLast = ''
  readStreams.on('data', (chunk) => {
    
    const numbers = chunk.toString().split("  ")
    if (Number(numbers[0]) !== Number(numbers[1]) - 1 && previousLast) {
      numbers[0] = previousLast + numbers[0]
    }
    if (parseInt(numbers[numbers.length - 1]) !== Number(numbers[numbers.length - 2]) + 1) {
      previousLast = numbers.pop();
    }

    numbers.map((num) => {
      num = num.replace(/ /g, "")
      if (parseInt(num) % 2 == 0) {
        if (!writeStreams.write(num + " ")) {
          readStreams.pause();
        }
      }
    })
  })
  writeStreams.on('drain', () => {
    readStreams.resume()
  })
  readStreams.on('end', () => {
    readStreams.close()
    writeStreams.end()
    readFile.close()
    writeFile.close()
  })
})()