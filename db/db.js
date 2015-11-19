/*
Rapid Prototyping with JS is a JavaScript and Node.js book that will teach you how to build mobile and web apps fast. — Read more at
http://rapidprototypingwithjs.com.
*/

var util = require('util');
var mongodb = require ('mongodb');
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;
var host = '127.0.0.1';
var port = 27017;

var db=new Db ('test', new Server(host,port, {}));
db.open(function(e,c){
	// console.log (util.inspect(db));
	console.log(db._state);
	db.close();
});

//cross-environment script
/*
var url = require('url')
var util = require('util');
var mongodb = require ('mongodb');
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;

var dbConnUrl = process.env.MONGOHQ_URL ||
'mongodb://127.0.0.1:27017';
var host = url.parse(dbConnUrl).hostname;
var port = new Number(url.parse(dbConnUrl).port);

 
var db=new Db ('test', new Server(host,port, {}));
db.open(function(e,c){
  // console.log (util.inspect(db));
  console.log(db._state);
  db.close();
});
*/
