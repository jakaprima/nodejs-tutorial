// var express = require('express');
// var morgan = require('morgan');
// // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// // menguraikan request body yang datang dalam middleware sebelum anda menghandel, tersedia dengan req.body property
// var bodyParser = require('body-parser');

// var hostname = 'localhost';
// var port = 3002;

// var app = express();

// app.use(morgan('dev'));
// app.use(bodyParser.json());

// // app.all() attaches to the application's router, so it's used whenever the app.router middleware is reached (which handles all the method routes... GET, POST, etc).
// // app.use() attaches to the application's main middleware stack, so it's used in the order specified by middleware. eg, if you put it first, it will be the first thing run. If you put it last, (after the router), it usually won't be run at all.

// // app.all melampirkan applikasi router, sehingga ini digunakan bagiamanapun app.router middleare tercapai misalnya menghandle semua route get post dll
// // app.use melampirkan aplikasi main middlware stack, jadi ini digunakan untuk menspesifikasikan middleware misalnya taru itu dulu itu kaan berjallan duluan pertama kali jika taro di akhir setelah router biasanya tidak akan jalan

// app.all('/contoh', function(req, res, next){
//   res.writeHead(200, {'Content-Type' : 'text/html'});
//   next();
// });

// app.get('/contoh', function(req, res, next){
//   res.end('mengirim semua data');
// });

// app.post('/contoh', function(req, res, next){
//   res.end('melakukan post ' + req.body.nama); //bisa karena adanya bodyparser module
// });

// app.delete('/contoh', function(req, res, next){
//   res.end('delete semua data')
// });

// app.get('/contoh/:idobject', function(req, res, next){
//   res.end('mengambil object id ' + req.params.idobject);
// });

// app.put('/contoh/:idobject', function(req, res, next){
//   res.write('put ' + req.params.idobject + '\n');
//   res.end('sama ngirim data' + req.body.nama);
// });

// app.delete('/contoh/:idobject', function(req, res, next){
//   res.end('delete : ' + req.params.idobject);
// });

// app.use(express.static(__dirname + '/public'));
// app.listen(port, hostname, function(){
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

var express = require('express');
var hostname = 'localhost';
var port = 3002;

var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/contoh', function(req, res, next){
  res.writeHead(200, {'Content-Type' : 'text/html'});
  next();
});

app.get('/contoh', function(req, res, next){
  res.end('mengambil semua data');
});

app.post('/contoh', function(req, res, next){
  res.end('posting' + req.body.nama);
});

app.delete('/contoh', function(req, res, next){
  res.end('delete semua data');
});

app.get('/contoh/:idobject', function(req, res, next){
  res.end('id object' + req.params.idobject);
});

app.put('/contoh/:idobject', function(req, res, next){
  res.write('id object : ' + req.params.idobject + '\n');
  res.end('membawa : ' + req.body.nama);
});

app.delete('/contoh/:idobject', function(req, res, next){
  res.end('delete :' + req.params.idobject);
});

app.use(express.static(__dirname + '/public'));
app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});








//check localhost:3000/dishes in postman
// untuk post buka postman cari body di raw pilih json lalu masukkan
// {"name":"jaka prima", "description": "deskripsi"}

// untuk get localhost:3000/dishes/10

