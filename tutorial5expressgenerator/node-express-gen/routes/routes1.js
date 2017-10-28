var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('view1', {props1: 'value1'});
});

module.exports = router;