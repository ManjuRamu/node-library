const express = require('express');
const app = express();
const {Worker} = require('worker_threads')
const _count =  3500000000; 
const _timeout = 100
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
  for (let i = 0; i < _count; i++) {
     count++;
  }
    res.status(200).send({count})
})

app.get("/non-blocking", (req,res) =>{
  res.status(200).send({res:"non-blocking completes"})
})

app.get("/blocking-timer", (req,res) =>{
  let count = 0;
  let i = 0;
  setTimeout(()=>{
    for ( ; i < _count/4; i++) {
      count++;
   }
   setTimeout(() => { 
    for (; i < _count/3; i++) {
      count++;
   }
   setTimeout(() => {
    for (; i < _count/2; i++) {
      count++;
   }
   setTimeout(() => {
    for (; i < _count; i++) {
      count++;
   }
   res.status(200).send({count})
   }, _timeout);
   },_timeout);
   },_timeout);
  },_timeout)
   
   
})
app.listen(3000, ()=>{
console.log("server listen on : ", 3000)
})
