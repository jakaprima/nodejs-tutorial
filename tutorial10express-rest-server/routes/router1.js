var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var model1 = require('../models/model-2');

var router1 = express.Router();
router1.use(bodyParser.json());
router1.route('/')
  .get(function(req, res, next){
    // res.end('mengirim semua data');
    model1.find({}, function(err, dish){
    	if (err) throw err;
    	res.json(dish);
    });
  })

  .post(function(req, res, next){
    // res.end('melakukan post' + req.body.nama);
    model1.create(req.body, function(err, dish){
    	if(err) throw err;
    	console.log('sudah terupdate');
    	var id = dish._id;
    	res.writeHead(200, {'Content-Type' : 'text/html'});

    	res.end('ditambahkan dish id : ' + id);
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
	    model1.findById(req.params.idobject, function(err, dish){
	    	if(err) throw err;
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
	    	if(err) throw err;
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

router1.route('/:idobject/comments')
	.get(function (req, res, next) {
	    model1.findById(req.params.idobject, function (err, dish) {
	        if (err) throw err;
	        res.json(dish.comments);
	    });
	})

	.post(function (req, res, next) {
	    model1.findById(req.params.idobject, function (err, dish) {
	        if (err) throw err;
	        dish.comments.push(req.body);
	        dish.save(function (err, dish) {
	            if (err) throw err;
	            console.log('Updated Comments!');
	            res.json(dish);
	        });
	    });
	})

	.delete(function (req, res, next) {
	    model1.findById(req.params.idobject, function (err, dish) {
	        if (err) throw err;
	        for (var i = (dish.comments.length - 1); i >= 0; i--) {
	            dish.comments.id(dish.comments[i]._id).remove();
	        }
	        dish.save(function (err, result) {
	            if (err) throw err;
	            res.writeHead(200, {
	                'Content-Type': 'text/plain'
	            });
	            res.end('Deleted all comments!');
	        });
	    });
	});

router1.route('/:idobject/comments/:commentId')
	.get(function (req, res, next) {
	    model1.findById(req.params.idobject, function (err, dish) {
	        if (err) throw err;
	        res.json(dish.comments.id(req.params.commentId));
	    });
	})

	.put(function (req, res, next) {
	    // We delete the existing commment and insert the updated
	    // comment as a new comment
	    model1.findById(req.params.idobject, function (err, dish) {
	        if (err) throw err;
	        dish.comments.id(req.params.commentId).remove();
	        dish.comments.push(req.body);
	        dish.save(function (err, dish) {
	            if (err) throw err;
	            console.log('Updated Comments!');
	            res.json(dish);
	        });
	    });
	})

	.delete(function (req, res, next) {
	    model1.findById(req.params.idobject, function (err, dish) {
	        dish.comments.id(req.params.commentId).remove();
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

// Exercise (Instructions): REST API with Express, MongoDB and Mongoose
// Objectives and Outcomes

// In this exercise, you will integrate the REST API server based on the Express framework that you implemented earlier, together with the Mongoose schema and models that you developed as part of Assignment 2 to create a full-fledged REST API server. At the end of this exercise, you will be able to:

// Develop a full-fledged REST API server with Express, MongoDB and Mongoose
// Serve up various REST API end points together with interaction with the MongoDB server.


// HTTP	Request	to	Database	Operation	Mapping
// • Every	incoming	request	needs	to	be	decoded	to	
// decide	the	nature	of	the	request:
// – GET,	PUT,	POST,	DELETE
// – Resource	affected
// – Data	in	body	of	request
// • Translate	request	to	an	equivalent	database	
// operation

// HTTP request ke operasi database mapping