var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify    = require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.end('mengirim semua data');
    User.find({}, function(err, dish){
      if (err) throw err;
      res.json(dish);
    });
});


router.post('/daftar', function(req, res) {
    User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        if (req.body.namadepan){
          user.namadepan = req.body.namadepan;
        }
        if(req.body.namabelakang){
          user.namabelakang = req.body.namabelakang;
        }
        user.save(function(err, user){
          passport.authenticate('local')(req, res, function () {
              return res.status(200).json({status: 'registrasi berhasil!'});
          });
        });

    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'tidak dapat login'
        });
      }
        
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login berhasil!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

// setelah login dapet akses token akses token digunakan untuk request setiap di router1 yang butuh ini untuk dilihat
// buka postman taro token di header atau di body dari setiap request data di router yang membutuhkan verify
// headers = key : x-access-token value : isi token hasil login

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'status logout sukses'
  });
});

module.exports = router;