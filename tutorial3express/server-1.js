var express = require('express');
var http = require('http');
var hostname = 'localhost';
var port = 3002;

var app = express();

// app.use Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
app.use(function(req, res, next){
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.end('<h2>testing express</h2>');
});

var server = http.createServer(app);

server.listen(port, hostname, function(){
	console.log(`server berjalan di http://${hostname}:${port}`)
});
