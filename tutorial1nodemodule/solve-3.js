var argv = require('yargs')
	.usage('Usage: node $0 --l=[num] --b[num]')
	.demand(['l', 'b'])
	.argv;

var rect = require('./rectangle-2');

function solveRect(l, b){
	console.log('l = ' + l + ' b = ' + b);
	rect(l, b, function(err, rectangle){
		if(err){
			console.log(err);
		}else{
			console.log('l = ' + l + ' b = ' + b + ' is ' + rectangle.area());
			console.log('l = ' + l + ' b = ' + b + ' is ' + rectangle.perimeter());
		}
	});
};

solveRect(argv.l, argv.b);

// ✗ node solve-3 --l=2 --b=5


// http request message
// request line
// headers informas
// blank line
// body yang dibawa