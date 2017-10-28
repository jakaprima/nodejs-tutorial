var c = require('./module2');

function fungsi1(x, y){
	console.log('x = ' + x + ' y = ' + y);
	c(x, y, function(err, module2){
		if(err){
			console.log(err);
		}else{
			console.log('x = ' + x + ' y = ' + y + ' is ' + module2.method1());
			console.log('x = ' + x + ' y = ' + y + ' is ' + module2.method2());
		}
	});
};

fungsi1(2, 4);

//npm install yargs --save
