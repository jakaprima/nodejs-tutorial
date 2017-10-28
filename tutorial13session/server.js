var express = require('express');
var morgan = require('morgan');
// var cookieParser = require('cookie-parser');

//tidak perlu gunakan cookiesparser karena cookie akan diset dengan expression session
var session = require('express-session'); 

var FileStore = require('session-file-store')(session); // untuk store session pada server side

// dari serverside kita akan menandakan cookie sebelum dikirim ke client

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

// app.use(cookieParser('12345-67890-09876-54321')); // secret key
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321', // cookies
  saveUninitialized: true,
  resave: true,
  store: new FileStore()  
}));

function auth (req, res, next) {
        console.log(req.headers);
    if(!req.session.user){

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
            req.session.user = 'admin';
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
    else {
        if(req.session.user === 'admin'){
            console.log('req session : ', req.session);
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



// { host: 'localhost:3000', di client
//   connection: 'keep-alive',
//   'cache-control': 'no-cache',
//   'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
//   'postman-token': '8fdabe47-7310-247a-5fae-fbb9fc7b1a41',
//   accept: '*/*',
//   'accept-encoding': 'gzip, deflate, br',
//   'accept-language': 'en-US,en;q=0.8,id;q=0.6',
//   cookie: 'session-id=s%3AlvoAv8BsWDoIIWdLHrcYmc498iDF9jxt.0fRFLP8lhnc%2BGZH3FpUgWy9SkEwGeaF2qrNEphorBkY' }

// req session :  Session { di server
//   cookie: 
//    { path: '/',
//      _expires: null,
//      originalMaxAge: null,
//      httpOnly: true },
//   __lastAccess: 1501215751114,
//   user: 'admin' }

