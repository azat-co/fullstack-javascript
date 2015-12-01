var util = require('util')
var url = require('url')
var http = require('http')
var mongodb = require ('mongodb')
var client = require ('mongodb').MongoClient

var port = process.env.PORT || 1337
var dbConnUrl = process.env.MONGOLAB_URI || 'mongodb://@127.0.0.1:27017/test'

client.connect(dbConnUrl, {}, function(error, db) {
	console.log('error: ', error)
	db.listCollections().toArray(function(error, collections) {
    console.log('error: ', error)
		console.log('collections: ', collections)
		var server = http.createServer(function (request, response) { // Creates server
		  response.writeHead(200, {'Content-Type': 'text/plain'})   // Sets the right header and status code
		  response.end(util.inspect(collections))  // Outputs string with line end symbol
		})
		server.listen(port, function() {
			console.log('Server is running at %s:%s ', server.address().address, server.address().port) //sets port and IP address of the server
		})
    db.close()
	})
})
