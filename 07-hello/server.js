var http = require('http') // Loads http module

var port = process.env.PORT || 1337

var server = http.createServer(function (req, res) { // Creates server
  res.writeHead(200, {'Content-Type': 'text/plain'})   // Sets the right header and status code
  res.end('Hello World\n')  // Outputs string with line end symbol
})
server.listen(port, function() {
	console.log('Server is running at %s:%s ', server.address().address, server.address().port) //sets port and IP address of the server
})
