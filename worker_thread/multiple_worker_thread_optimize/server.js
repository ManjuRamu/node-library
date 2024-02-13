const express = require('express');
const app = express();
const {Worker} = require('worker_threads')
const thread_count = 4;
const _count = 5000000000;

function workerHandler() {
  return new Promise((res, rej) =>{
    let worker = new Worker("./worker.js", {
      workerData:{thread_count, _count}
    })
    worker.on("message", (data) =>{
      res(data)
    })
    worker.on('error', (err) =>{
      rej(err);
    })
  })
}

app.get("/blocking-worker", async (req,res ) =>{
   const workerResultsPromises = [];
   for (let i = 0; i < thread_count; i++) {
    workerResultsPromises.push(workerHandler())
   }
  const workerCounters = await Promise.all(workerResultsPromises)
  const count =  workerCounters.reduce((a, b) => a+b, 0)
   res.status(200).send({count:count})
})
app.get("/non-blocking", (req,res) =>{
  res.status(200).send({res:"non-blocking completes"})
})


app.get("/blocking", (req,res) =>{
  let count = 0;
  for (let i = 0; i < _count; i++) {
     count++;
  }
    res.status(200).send({count})
})

app.listen(3000, ()=>{
console.log("server listen on : ", 3000)
})