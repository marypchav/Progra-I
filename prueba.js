const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

// Create the server and define the response
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('holaaa!\n');
});

// Start listening for requests
server.listen(port, hostname, () => {
  console.log(`aquí está tu server bella un abrazo http://${hostname}:${port}/`);
});