// HTTP request logger middleware for node.js
// request HTTP perekam middleware
// morgan(':method :url :status :res[content-length] - :response-time ms')

var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3002;

var app = express();

app.use(morgan('dev'));
//serving static resource
app.use(express.static(__dirname + '/public'));
app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
})