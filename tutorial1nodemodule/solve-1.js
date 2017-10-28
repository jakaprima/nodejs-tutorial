var c = require('./module1');

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


// jalaninnya click di command prompt node solve-1



// CommonJS API mengisi celah ini dengan mendefinisikan API
// Untuk kebutuhan aplikasi yang umum
// - Ini mendefinisikan format modul
// - Node mengikuti spesifikasi modul CommonJS

// Node	Modules
// • Each	file	in	Node	is	its	own	module / atau paket
// • The	module variable	gives	access	to	the	current	
// module	definition	in	a	file
// • The	module.exports variable	determines menentukan	the	
// export	from	the	current	module
// • The	require function	is	used	to	import	a	module


// • Exact:	npminstall	express@4.0.0 instal versi tertentu
// • Patch	acceptable:	npminstall	express@”~4.0.0” versi diatas itu di accept atau diperbolehkan
// • Minor	version	acceptable:	npm	install	express@”^4.0.0” versi rendah diperbolehkan