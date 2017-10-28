var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var model1 = require('../models/model-2');
var Verify = require('./verify');

var router1 = express.Router();
router1.use(bodyParser.json());
router1.route('/')
	.get(function (req, res, next) {
	    model1.find(req.query)
	        .populate('komentar.pembuat')
	        .exec(function (err, dish) {
	        if (err) next(err);
	        res.json(dish);
	    });
	})

  .post(function(req, res, next){
    // res.end('melakukan post' + req.body.nama);
    model1.create(req.body, function(err, dish){
    	if (err) throw err;
    	console.log('sudah terupdate');
    	var id = dish._id;
    	res.writeHead(200, {'Content-Type' : 'text/html'});

    	res.end('ditambahkan databaru id : ' + id);
    });
  })

  .delete(function(req, res, next){
    // res.end('delete semua');
    model1.remove({}, function(err, resp){
    	if (err) throw err;
    	res.json(resp);
    });
  });

router1.route('/:idobject')
	  .get(function(req, res, next){
	    // res.end('get data' + req.params.idobject);
	    model1.findById(req.params.idobject)
	    .populate('komentar.pembuat')
	    .exec(function(err, dish){
	    	if (err) throw err;
	    	res.json(dish);
	    });
	  })

	  .put(function(req, res, next){
	    // res.write('params ' + req.params.idobject);
	    // res.end('put ' + req.body.nama );
	    model1.findByIdAndUpdate(req.params.idobject, {
	    	$set: req.body
	    }, {
	    	new: true
	    }, function (err, dish){
	    	if (err) throw err;
	    	res.json(dish);
	    });
	  })

	  .delete(function(req, res, next){
	    // res.end('delete ' + req.params.idobject);
	    model1.findByIdAndRemove(req.params.idobject, function (err, resp) {
	        if (err) throw err;
	        res.json(resp);
	    });
	  });

router1.route('/:idobject/komentar')

	.get(function (req, res, next) {
	    model1.findById(req.params.idobject)
	    .populate('komentar.pembuat')
	    .exec(function (err, dish){
	    	if(err) next(err);
	    	res.json(dish.komentar);
	    });
	})

	.post(function (req, res, next) {
	    model1.findById(req.params.idobject, function (err, dish) {
	        if (err) throw err;
	        req.body.pembuat = req.decoded._id;
	        dish.komentar.push(req.body);
	        dish.save(function(err, dish){
	        	if (err) throw err;
	        	console.log('berhasil di update');
	        	res.json(dish);
	        });
	    });
	})

	.delete(function (req, res, next) {
	    model1.findById(req.params.idobject, function (err, dish) {
	        if (err) throw err;
	        for (var i = (dish.komentar.length - 1); i >= 0; i--) {
	            dish.komentar.id(dish.komentar[i]._id).remove();
	        }
	        dish.save(function (err, result) {
	            if (err) throw err;
	            res.writeHead(200, {
	                'Content-Type': 'text/plain'
	            });
	            res.end('delete semua komentar!');
	        });
	    });
	});

router1.route('/:idobject/komentar/:commentId')
	.get(function (req, res, next) {
	    model1.findById(req.params.idobject)
	    .populate('komentar.pembuat')
	    .exec(function (err, dish) {
	        if (err) throw err;
	        res.json(dish.komentar.id(req.params.commentId));
	    });
	})

	.put(function (req, res, next) {
	    // We delete the existing commment and insert the updated
	    // comment as a new comment
	    model1.findById(req.params.idobject, function (err, dish) {
	        if (err) throw err;
	        dish.komentar.id(req.params.commentId).remove();
	        dish.body.pembuat = req.decoded._id;
	        dish.komentar.push(req.body);
	        dish.save(function (err, dish) {
	            if (err) throw err;
	            console.log('Updated Comments!');
	            res.json(dish);
	        });
	    });
	})

	.delete(function (req, res, next) {
	    model1.findById(req.params.idobject, function (err, dish) {
	    	if (model1.komentar.id(req.params.commentId).pembuat != req.decoded._id){
	    		var err = new Error('anda tidak diizinkan melakukan operasi delete ini');
	    		err.status = 403;
	    		return next(err);
	    	}
	        dish.komentar.id(req.params.commentId).remove();
	        dish.save(function (err, resp) {
	            if (err) throw err;
	            res.json(resp);
	        });
	    });
	});

// app.use('/contoh', expressRouter);

// app.use(express.static(__dirname + '/public'));
// app.listen(port, hostname, function(){
//     console.log(`Server running at http://${hostname}:${port}/`);
// })

// router.get('/', function(req, res, next){
// 	res.render('view1', {props1: 'value1'});
// });

module.exports = router1;

// kalo udah selesai coba
// localhost:3000/router1?feature=true