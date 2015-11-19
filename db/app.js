/*
Rapid Prototyping with JS is a JavaScript and Node.js book that will teach you how to build mobile and web apps fast. — Read more at
http://rapidprototypingwithjs.com.
*/
var util = require('util');
var url = require('url');
var http=require('http');
var mongodb = require ('mongodb');
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;
var port = process.env.PORT || 1337;
var dbConnUrl = process.env.MONGOHQ_URL || "mongodb://@127.0.0.1:27017";
var dbHost = url.parse(dbConnUrl).hostname;
var dbPort = new Number(url.parse(dbConnUrl).port);
console.log(dbHost+dbPort)
var db=new Db ('test', new Server(dbHost, dbPort, {}));
db.open(function(e,c){
	// console.log (util.inspect(db));	
	var server = http.createServer(function (req, res) { //creates server
	  res.writeHead(200, {'Content-Type': 'text/plain'});   //sets the right header and status code
	  res.end(db._state);  //outputs string with line end symbol
	});
	server.listen(port, function() {
		console.log('Server is running at %s:%s ', server.address().address, server.address().port); //sets port and IP address of the server	
	});
	db.close();
});

