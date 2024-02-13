const {parentPort} = require('worker_threads')
let count = 0;
const _count =  3500000000; 
  for (let i = 0; i < _count; i++) {
     count++;
  }

  parentPort.postMessage(count)