/*
Rapid Prototyping with JS is a JavaScript and Node.js book that will teach you how to build mobile and web apps fast. — Read more at
http://rapidprototypingwithjs.com.
*/

var http = require('http');
var util = require('util');
var querystring = require('querystring');
var mongo = require('mongodb');

var host = process.env.MONGOHQ_URL || "mongodb://localhost:27017/board";
//MONGOHQ_URL=mongodb://user:pass@server.mongohq.com/db_name

var MongoClient = mongo.MongoClient
MongoClient.connect(host, function(error, db) {
  if (error) throw error;
  var collection = db.collection('messages');
  var app = http.createServer( function (request, response) {
    var origin = (request.headers.origin || "*");
    if (request.method=="OPTIONS") {
      response.writeHead("204", "No Content", {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "content-type, accept",
        "Access-Control-Max-Age": 10, // Seconds.
        "Content-Length": 0
      });
      response.end();
    };
    if (request.method==="GET"&&request.url==="/messages/list.json") {
      collection.find().toArray(function(error,results) {
        var body = JSON.stringify(results);
        response.writeHead(200,{
          'Access-Control-Allow-Origin': origin,
          'Content-Type':'text/plain',
          'Content-Length':body.length
        });
        console.log("LIST OF OBJECTS: ");
        console.dir(results);
        response.end(body);
      });
    };
    if (request.method==="POST"&&request.url==="/messages/create.json") {
      request.on('data', function(data) {
        console.log("RECEIVED DATA:")
        console.log(data.toString('utf-8'));
        collection.insert(JSON.parse(data.toString('utf-8')),
        {safe:true}, function(error, obj) {
          if (error) throw error;
          console.log("OBJECT IS SAVED: ")
          console.log(JSON.stringify(obj))
          var body = JSON.stringify(obj);
          response.writeHead(200,{
            'Access-Control-Allow-Origin': origin,
            'Content-Type':'text/plain',
            'Content-Length':body.length
          });
          response.end(body);
        })
      })

    };

  });
  var port = process.env.PORT || 5000;
  app.listen(port);
})
