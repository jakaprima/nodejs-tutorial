// 1. npm install passport-facebook --save
// 2. buat nama file authenticate.js

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); // middleware http
var cookieParser = require('cookie-parser'); //mengurai cookie
var bodyParser = require('body-parser'); //menguraikan body 
var mongoose = require('mongoose'); // membuat schema database
var passport = require('passport'); // auth with passport
// var LocalStrategy = require('passport-local').Strategy; // --------- // tidak perlu ini karena di taru di authenticate file
var fs = require('fs'); // ---------
var authenticate = require('./authenticate'); // untuk autentikasi facebook

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
// var User = require('./models/user'); // ga dipake lagi karena pindah ke file authenticate

// app.use(passport.initialize());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

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





