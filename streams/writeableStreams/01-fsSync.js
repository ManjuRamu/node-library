(async function () {
  // Six core 
  // CPU - 32%
  // memory - 34 -41 Mb
  // Execution time 27 - 30 sec
  const fs = require("fs/promises")
  console.time("witeManyFs")
  const fileHandler = await fs.open("witeMany.txt",'w')
  for (let i = 0; i<1000;i++)
   await  fileHandler.write(`${i} `)
   console.timeEnd("witeManyFs")
})()