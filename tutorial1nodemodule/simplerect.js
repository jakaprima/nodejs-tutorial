

var c = {
	method1: function(param1, param2){
		return (param1 + param2);
	},
	method2: function(param1, param2){
		return (2 * (param1 + param2));
	}
};

function fungsi1(x, y){
	console.log('x = ' + x + " y = " + y );
	if(x < 0 || y < 0){
		console.log('data kurang dari 0');
	}else{
		console.log('x + ' + x + ' y ' + y + ' = ' + c.method1(x, y));
		console.log('2 * ( ' + x + ' + ' + y + ' )' + ' = ' + c.method2(x, y))
	}
}

fungsi1(5, 10);