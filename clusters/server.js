const http = require("http");
const { Worker } = require("worker_threads");
const thread_count = 4;

function workerHandler() {
  return new Promise((res, rej) => {
    let worker = new Worker("./worker.js", {
      workerData: { thread_count },
    });
    worker.on("message", (data) => {
      res(data);
    });
    worker.on("error", (err) => {
      rej(err);
    });
  });
}
const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/non-blocking":
      res.setHeader("Content-Type", "text/plain");
      res.write("non blocking response");
      res.end();
      break;

    case "/blocking":
      let i = 0;
      for (; i < 5000000000; i++) {}
      res.setHeader("Content-Type", "text/plain");
      res.write("blocking response " + i);
      res.end();
      break;
    case "/time-out":
      setTimeout(() => {
        res.setHeader("Content-Type", "text/plain");
        res.write("time-out response");
        res.end();
      }, 7000);
      break;
    case "/blocking-worker":
      const workerResultsPromises = [];
      for (let i = 0; i < thread_count; i++) {
        workerResultsPromises.push(workerHandler());
      }
      const workerCounters = await Promise.all(workerResultsPromises);
      const count = workerCounters.reduce((a, b) => a + b, 0);
      res.setHeader("Content-Type", "text/plain");
      res.write(`total count ${count}`);
      res.end();
      break;
    default:
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.write("server working fine");
      res.end();
      break;
  }
});

server.listen(3000, () => {
  console.log("server running on 3000");
});
