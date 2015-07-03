var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'header'});
  response.end('Hello World\n');
}).listen(8124);