const http = require('http')
// Loads http module
const util= require('util')
// Usefull functions
const querystring = require('querystring')
// Loads querystring module, we'll need it to serialize and deserialize objects and query strings

const port = process.env.PORT || 1337

const messages = []
// This array will hold our messages
messages.push({
  'name': 'John',
  'message': 'hi'
})
// Sample message to test list method

exports.server = http.createServer(function (req, res) {
// Creates server
  if (req.method == 'POST' && req.url == '/messages/create.json') {
    // If method is POST and URL is messages/ add message to the array
    let message = ''
    req.on('data', function(data, msg){
      console.log(data.toString('utf-8'))
      message = exports.addMessage(data.toString('utf-8'))
      // Data is type of Buffer and must be converted to string with encoding UTF-8 first
      // Adds message to the array
    })
    req.on('end', function(){
      console.log('message', util.inspect(message, true, null))
      console.log('messages:', util.inspect(messages, true, null))
      // Debugging output into the terminal
      res.writeHead(200, {'Content-Type': 'text/plain'})
      // Sets the right header and status code
      res.end(message)
      // Out put message, should add object id
    })
  } else if (req.method == 'GET' && req.url == '/messages/list.json') {
  // If method is GET and URL is /messages output list of messages
    const body = exports.getMessages()
    // Body will hold our output
    res.writeHead(200, {
      'Content-Length': body.length,
      'Content-Type': 'text/plain'
    })
    res.end(body)
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    // Sets the right header and status code
		res.end('Supported endpoints: \n/messages/list.json\n/messages/create.json')
    // Outputs string with line end symbol
  }

}).listen(port)
// Sets port and IP address of the server
console.log('Server running at http://127.0.0.1:%s/', port)

exports.getMessages = function() {
  return JSON.stringify(messages)
  // Output array of messages as a string/text
}
exports.addMessage = function (data){
  messages.push(querystring.parse(data))
  // To convert string into JavaScript object we use parse/deserializer
  return JSON.stringify(querystring.parse(data))
  // Output new message in JSON as a string
}
