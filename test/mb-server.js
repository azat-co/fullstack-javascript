/*
Rapid Prototyping with JS is a JavaScript and Node.js book that will teach you how to build mobile and web apps fast. — Read more at
http://rapidprototypingwithjs.com.
*/

var http = require('http');
//loads http module
var util= require('util');
//usefull functions
var querystring = require('querystring');
//laods querystring module, we'll need it to serialize and deserialize objects and query strings

var messages=[];
//this array will hold our messages
messages.push({
  "name":"John",
  "message":"hi"
});
//sample message to test list method

exports.server=http.createServer(function (req, res) {
//creates server
  if (req.method=="POST"&&req.url=="/messages/create.json") {
    //if method is POST and URL is messages/ add message to the array
    var message='';
    req.on('data', function(data, msg){
      console.log(data.toString('utf-8'));
      message=exports.addMessage(data.toString('utf-8'));
      //data is type of Buffer and must be converted to string with encoding UTF-8 first
      //adds message to the array

    })
    req.on('end', function(){
      console.log('message', util.inspect(message, true, null));
      console.log('messages:', util.inspect(messages, true, null));
      //debugging output into the terminal
      res.writeHead(200, {'Content-Type': 'text/plain'});
      //sets the right header and status code
      res.end(message);
      //out put message, should add object id
    })
  } else
  if (req.method=="GET"&&req.url=="/messages/list.json") {
  //if method is GET and URL is /messages output list of messages
    var body=exports.getMessages();
    //body will hold our output
    res.writeHead(200, {
      'Content-Length': body.length,
      'Content-Type': 'text/plain'
    });
    res.end(body);
  }
  else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //sets the right header and status code
    res.end('Hello World\n');
  };
  console.log(req.method);

  //outputs string with line end symbol
}).listen(process.env.PORT || 1337);
//sets port and IP address of the server
console.log('Server running at http://127.0.0.1:1337/');


exports.getMessages = function() {
  return JSON.stringify(messages);
  //output array of messages as a string/text
};
exports.addMessage = function (data){
  messages.push(querystring.parse(data));
  //to convert string into JavaScript object we use parse/deserializer
  return JSON.stringify(querystring.parse(data));
  //output new message in JSON as a string
};
