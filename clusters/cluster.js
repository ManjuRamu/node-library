const cluster = require("cluster");
const http = require("http");

if (cluster.isMaster) {
  console.log("master process " + process.pid + " is running ");
  cluster.fork(); // create worker 
  cluster.fork(); // create a worker
} else {
  const server = http.createServer((req, res) => {
    switch (req.url) {
      case "/non-blocking":
        res.setHeader("Content-Type", "text/plain");
        res.write("non blocking response");
        res.end();
        break;

      case "/blocking":
        let i = 0;
        for (; i < 5000000000; i++) {
          // console.log(i)
        }
        res.setHeader("Content-Type", "text/plain");
        res.write("blocking response " + i);
        res.end();
        break;

      case "/non-blocking-worker":
        res.setHeader("Content-Type", "text/plain");
        res.write("non blocking response");
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
    console.log(`worker ${process.pid} is running`);
  });
}
