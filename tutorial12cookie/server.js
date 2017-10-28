var express = require('express');
var morgan = require('morgan');
// enable setting cookie dari server side pada client side
// dan otomasi cookie tersebut digunakan dan dikembalikan dari client ke server
var cookieParser = require('cookie-parser');

// dari serverside kita akan menandakan cookie sebelum dikirim ke client

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(cookieParser('12345-67890-09876-54321')); // secret key

function auth (req, res, next) {
        console.log(req.headers);
    if(!req.signedCookies.user){

        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
            return;
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            res.cookie('user', 'admin', {signed : true});
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
    else {
        if(req.signedCookies.user === 'admin'){
            console.log(req.signedCookies);
            next();
        }else{
            var err = new Error('kamu tidak ter autentikasi');
            err.status = 401;
            next(err);
        }

    }

}



app.use(auth);

app.use(express.static(__dirname + '/public'));
app.use(function(err,req,res,next) {
            res.writeHead(err.status || 500, {
            'WWW-Authenticate': 'Basic',
            'Content-Type': 'text/plain'
        });
        res.end(err.message);
});

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});


// cookies adalah sepotong kecil data yang dikirim dari server dan di simpan dalam client browser  set-cookie : xxx
// selanjutnya setiap request dari client haris include cookie untuk request header = cookie : xxx
// cookie di urai parsed pada express server menggunakan cookie parser middleware
// cookie menguraikan melakukan parsing yang masuk dan memasangnnya di request

// digunakan untuk track user session
// combinasi cookie dan session id dan server-side menyimpan informasi indexed by session id
// default tersimpan dalam memory
// permanen tersimpan di server side

