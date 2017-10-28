// User Authentication with Passport
// user request access dengan username dan password
// server memvalidasi
// server membuat signed token dan mengirimnya ke client (tidak ada yang di store di server)
// kemudian semua request dari client harus inclued token
// server memverifikasi token dan respon dengan data jika tervalidasi

// JWT(json web token)
// self contained = membawa semua informasi penting dengannya
// shareable = dapat share dengan aplikasi lain untuk berinteraksi kepentingan

// server set cookie pada client side dan cookie ini membawa session id 
// dimana client tersebut akan mengembalikan setiap request, session id ini akan digunakan oleh server sebagai index ke
// session storage
// tapi tidak akan scala atau luas jika punya milion user

// CORS dan CSRF

// JSON WEB TOKEN dibagi menjadi 3
// header header membawa informasi tentang bagaimana json web token terencoded contoh = {"typ" : "JWT"}

// payload bisa taruh tambahan di sini server bisa mendecodekannya dan dapat digunakan server untuk identify sesuatu tentang client kamu 
// contoh 
// {"$__" : { }} ...
// _doc: {} // membawa informasi dari user

// signature // ditambahakan dari JWT package untuk encapsulate dan memvalidasi token ini
// jadi ketika di serverside ketika token bermasalah server kaan menggunakan secret yang kamu berikan ke server
// secret hanya diketahui oleh server. terencoded dalam form menggunakan spesifik algoritma dan menaruhnya pada signature

// module json web token
// npm install jsonwebtoken --save
// melayani method
// sign() untuk signing dan masalah token
// verify() verifykasi dan decoding token dan membuatnya bisa diguankan dalam require properti dalam express

// passport
// authentikasi dengan middleware untuk nodejs

// dokumentasi =  http://passportjs.org/docs

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); // middleware http
var cookieParser = require('cookie-parser'); //mengurai cookie
var bodyParser = require('body-parser'); //menguraikan body 
var mongoose = require('mongoose'); // membuat schema database
var passport = require('passport'); // auth with passport
var LocalStrategy = require('passport-local').Strategy; // ---------
var fs = require('fs'); // ---------

var config = require('./config'); // membawa data json database dan secret key

mongoose.connect(config.mongoUrl); //melakukan koneksi ke database
var db = mongoose.connection; // digunakan untuk test koneksi
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("berhasil connect ke server");
});


// logic dalam routes (controller)
var routes = require('./routes/index');
var users = require('./routes/users');
var router1 = require('./routes/router1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'}) // membuat access log

app.use(logger('dev', {stream: accessLogStream}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // untuk parsing
app.use(cookieParser());

// passport config
var User = require('./models/user');

// Three pieces need to be configured to use Passport for authentication:

// Authentication strategies
// Application middleware
// Sessions (optional)

// passport.initialize() middleware is required to initialize Passport. If your application uses persistent login sessions, passport.session() middleware must also be used.
// contoh :
// app.configure(function() {
//   app.use(express.static('public'));
//   app.use(express.cookieParser());
//   app.use(express.bodyParser());
//   app.use(express.session({ secret: 'keyboard cat' }));
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(app.router);
// });
app.use(passport.initialize());

// passport menggunakan strategies untuk authentikasi request. jarak strategi dari verifikasi usernama dan password menyerahi autentikasi menggunakan OAuth atau menggabungkat (federated) autentikasi menggunakan openID

// Strategies, and their configuration, are supplied via the use() function. For example, the following uses the LocalStrategy for username/password authentication.
passport.use(new LocalStrategy(User.authenticate()));

// dalam typical web aplikasi, credential (surat pengenal) digunakan untuk authentikasi user akan hanya di transmitted (dikirim) saat login requet. jika success session akana di established (diterima) dan dimaintain via cookie set dalam user browser

// Setiap permintaan berikutnya tidak akan berisi kredensial, namun cookie unik yang mengidentifikasi sesi tersebut. Untuk mendukung sesi login, Passport akan membuat serialize dan deserialize instance user ke dan dari sesi.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', routes);
app.use('/users', users);
app.use('/router1',router1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;


// > db.users.update({username: "admin"}, {$set: {admin:true}});





