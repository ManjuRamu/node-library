const express = require('express');
const app = express();
const {Worker} = require('worker_threads')
app.get("/blocking-worker", (req,res) =>{
  let worker = new Worker("./worker.js")
  worker.on('message', (data) =>{
    res.status(200).send({count:data})
  })
  worker.on('error', (err) =>{
    res.status(400).send({err:err})
  })
})

app.get("/blocking", (req,res) =>{
  let count = 0;
  for (let i = 0; i < 10000000000; i++) {
     count++;
  }
    res.status(200).send({count})
})
app.get("/non-blocking", (req,res) =>{
  res.status(200).send({res:"non-blocking completes"})
})
app.listen(3000, ()=>{
console.log("server listen on : ", 3000)
})