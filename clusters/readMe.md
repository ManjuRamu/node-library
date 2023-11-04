  ![alt text](https://github.com/ManjuRamu/node-library/blob/main/public/git/images/cluster.PNG?raw=true)

  ![alt text](https://github.com/ManjuRamu/node-library/blob/main/public/git/images/cluster2.PNG?raw=true)


we can also create a cluster with non-cluster server code using pm2

- cmd:  pm2 server.js -i 0
  where 0 indicate let the pm2 decides the worker count as per cpu counts
  or we can mention number of worker by posting +ve int


![alt text](https://github.com/ManjuRamu/node-library/blob/main/public/git/images/cluster-server-with-pm2.PNG?raw=true)