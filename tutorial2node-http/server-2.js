//file system
var http = require('http'); //module
var hostname = 'localhost';
var port = 3002;

// file i/o digunakan untuk melayani simple wrapper sekitar standar POSIX function.
var fs = require('fs') //filesystem module
// path module digunakan untuk melayani kebutuhan untuk bekerja dengan file dan directory path.
var path = require('path') // path module



var server = http.createServer(function(req, res){
  if(req.method == 'GET'){
    var fileUrl;
    if(req.url == '/'){
      fileUrl = '/index.html';
    }
    else
      fileUrl = req.url;
      // fileUrl isinya about.html
      var filePath = path.resolve('./public' + fileUrl);
      var fileExt = path.extname(filePath);
      if(fileExt == '.html'){
        fs.exists(filePath, function(exists){
          if(!exists){
            res.writeHead(404, {'Content-Type' : 'text/html'});
            res.end('<h1>file tidak ditemukan</h1>' + fileUrl);
          }else{
            res.writeHead(200, {'Content-Type' : 'text/html'});
            fs.createReadStream(filePath).pipe(res);
            // res.write('info : file ext ' + fileExt + '<br>' );
            // res.write('info : file path ' + filePath + '<br>' );
            // res.write('info : req.method ' + req.method + '<br>' );
            // res.end('<h1> info : file ada ' + fileExt + '</h1>');
          }
        });
      }else{
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('format bukan html tapi = ' + fileExt);
      }
    }else{
      res.writeHead(404, {'Content-Type' : 'text/html'});
      res.end('method tidak di support' + req.method);
    }
});

server.listen(port, hostname, function(){
  console.log(`server berjalan di http://${hostname}:${port}`);
});


// http://localhost:3000/
//http://localhost:3000/aboutus.html