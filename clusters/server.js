const http = require("http");
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/non-blocking":
      res.setHeader("Content-Type", "text/plain");
      res.write("non blocking response");
      res.end()
      break;

    case "/blocking":
      let i = 0;
      for (; i < 5000000000; i++) {
        // console.log(i)
      }
      res.setHeader("Content-Type","text/plain");
      res.write("blocking response "+ i);
      res.end()
     
      break;

    case "/non-blocking-worker":
      res.setHeader("Content-Type", "text/plain");
      res.write("non blocking response");
      res.end()
      break;
    default:
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.write("server working fine")
      res.end()
      break;
  }
});

server.listen(3000, () => {
  console.log("server running on 3000");
});
