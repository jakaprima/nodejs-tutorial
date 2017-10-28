var http = require('http');
var hostname = 'localhost';
var port = 3001;

var server = http.createServer(function(req, res){ // harus req dulu baru res
	console.log('request header = ', req.headers);
// argumen pertama dari res.writeHead adalah status code yaitu 200 ini berarti ok, dan parameter ke dua  berisi object yang mengandung response headers
	res.writeHead(200, {'Content-Type' : 'text/html'});  
	res.end('<h1>testing</h1>');
});

server.listen(port, hostname, function(){ //harus port dulu baru hostname
	console.log(`server berjalan di http://${hostname}:${port}`);
})



// gunakan postman dan ketik localhost:3000/
// buat index.html di dalam public

// GENERAL
// Request URL:http://localhost:3000/
// Request Method:GET
// Status Code:200 OK
// Remote Address:127.0.0.1:3000
// Referrer Policy:no-referrer-when-downgrade
// ___________________________________________________
// Response Headers
// view source
// Connection:keep-alive
// Content-Type:text/html
// Date:Tue, 25 Jul 2017 10:35:51 GMT
// Transfer-Encoding:chunked
// Request Headers
// view parsed
// GET / HTTP/1.1
// Host: localhost:3000
// Connection: keep-alive
// Cache-Control: max-age=0
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
// Accept-Encoding: gzip, deflate, br
// Accept-Language: en-US,en;q=0.8,id;q=0.6
// Cookie: _hjIncludedInSample=1; oprent.jwt=585ea00fdb8305ef4702f6152f3d335f9f2d94a6; oprent.banners=%7B%22email%22%3Afalse%2C%22kyc%22%3Atrue%2C%22friend_code%22%3Atrue%7D; _ga=GA1.1.26382494.1500368298; _gid=GA1.1.888384543.1500869154; oprent.currentVersion=0; io=bSxatAwayLZnBpxlAAAA; intercom-id-hvvw5xpi=be988fc7-de3f-4485-b150-1b9e7943ab05; _hp2_id.1377739843=%7B%22userId%22%3A%221732036574595712%22%2C%22pageviewId%22%3A%228314780893348661%22%2C%22sessionId%22%3A%224720860418444926%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%223.0%22%7D