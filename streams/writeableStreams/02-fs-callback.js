(function () {
  const  fs  = require('node:fs')
  const process = require('process')
  console.time("witeManyFsCb")
   // Six core 
   // CPU - 22%
   // memory - 45Mb //took lot memory can't check where it's too quick process
   // Execution time: 2-3 secs
  fs.open("writeManyCb.txt",'w',(err,fd) =>{
  
    for (let i = 0; i<10000000;i++) //28.624s 
     fs.writeSync(fd, `${i} `,()=>{})  // Execution time: fs.write  1.5 - 2secs numbers not in order;  goes to event loops
     console.timeEnd("witeManyFsCb")
  })
})()