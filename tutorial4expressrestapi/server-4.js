// mwnggunakan router express







// dishRouter.route('/')
// .all(function(req,res,next) {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       next();
// })

// .get(function(req,res,next){
//         res.end('Will send all the dishes to you!');
// })

// .post(function(req, res, next){
//     res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);    
// })

// .delete(function(req, res, next){
//         res.end('Deleting all dishes');
// });

// dishRouter.route('/:dishId')
// .all(function(req,res,next) {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       next();
// })

// .get(function(req,res,next){
//         res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
// })

// .put(function(req, res, next){
//         res.write('Updating the dish: ' + req.params.dishId + '\n');
//     res.end('Will update the dish: ' + req.body.name + 
//             ' with details: ' + req.body.description);
// })

// .delete(function(req, res, next){
//         res.end('Deleting dish: ' + req.params.dishId);
// });

// app.use('/dishes',dishRouter);

// app.use(express.static(__dirname + '/public'));

// app.listen(port, hostname, function(){
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

var express = require('express');
var http = require('http');
var hostname = 'localhost';
var port = 3002;

var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('dev'));
var expressRouter = express.Router();
expressRouter.use(bodyParser.json());

expressRouter.route('/')
  .all(function(req, res, next){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    next();
  })

  .get(function(req, res, next){
    res.end('mengirim semua data');
  })

  .post(function(req, res, next){
    res.end('melakukan post' + req.body.nama);
  })

  .delete(function(req, res, next){
    res.end('delete semua');
  });

expressRouter.route('/:idobject')
  .all(function(req, res, next){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    next();
  })
  .get(function(req, res, next){
    res.end('get data' + req.params.idobject);
  })

  .put(function(req, res, next){
    res.write('params ' + req.params.idobject);
    res.end('put ' + req.body.nama );
  })

  .delete(function(req, res, next){
    res.end('delete ' + req.params.idobject);
  });

app.use('/contoh', expressRouter);

app.use(express.static(__dirname + '/public'));
app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
})

