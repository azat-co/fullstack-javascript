/*
Rapid Prototyping with JS is a JavaScript and Node.js book that will teach you how to build mobile and web apps fast. — Read more at
http://rapidprototypingwithjs.com.
*/

var http = require('http'); //loads http module

var port = process.env.PORT || 1337;

var server = http.createServer(function (req, res) { //creates server
  res.writeHead(200, {'Content-Type': 'text/plain'});   //sets the right header and status code
  res.end('Hello World\n');  //outputs string with line end symbol
});
server.listen(port, function() {
	console.log('Server is running at %s:%s ', server.address().address, server.address().port); //sets port and IP address of the server	
});

