const util = require('util')
const url = require('url')
const http = require('http')
const mongodb = require ('mongodb')
const client = require ('mongodb').MongoClient

const port = process.env.PORT || 1337
const dbConnUrl = process.env.MONGOLAB_URI || 'mongodb://@127.0.0.1:27017/test'

client.connect(dbConnUrl, {}, (error, db) => {
  console.log('error: ', error)
  db.listCollections().toArray((error, collections) => {
    console.log('error: ', error)
    console.log('collections: ', collections)
    const server = http.createServer( (request, response) => { // Creates server
      response.writeHead(200, {'Content-Type': 'text/plain'})   // Sets the right header and status code
      response.end(util.inspect(collections))  // Outputs string with line end symbol
    })
    server.listen(port, () => {
      console.log('Server is running at %s:%s ',
        server.address().address, server.address().port) //sets port and IP address of the server
    })
    db.close()
  })
})
