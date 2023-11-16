const {parentPort, workerData} = require('worker_threads')
let count = 0;
  for (let i = 0; i < 5000000000/workerData.thread_count; i++) {
     count++;
  }
  parentPort.postMessage(count) 