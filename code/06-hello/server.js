const http = require('http') // Loads http module

const port = process.env.PORT || 1337

const server = http.createServer((req, res) => { // Creates server
  res.writeHead(200, {'Content-Type': 'text/plain'})   // Sets the right header and status code
  res.end('Hello World\n')  // Outputs string with line end symbol
})
server.listen(port, () => {
  console.log('Server is running at %s:%s ', 
    server.address().address, server.address().port) // Sets port and IP address of the server
})
