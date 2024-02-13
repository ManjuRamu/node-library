const {parentPort, workerData} = require('worker_threads')
let count = 0;
  for (let i = 0; i < workerData._count/workerData.thread_count; i++) {
     count++;
  }
  parentPort.postMessage(count) 