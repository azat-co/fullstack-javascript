const http = require('http')
const util = require('util')
const querystring = require('querystring')
const client = require('mongodb').MongoClient

const uri = process.env.MONGOLAB_URI || 'mongodb://@127.0.0.1:27017/messages'
//MONGOLAB_URI=mongodb://user:pass@server.mongohq.com:port/db_name

client.connect(uri, (error, db) => {
	if (error) return console.error(error)
	const collection = db.collection('messages')
	const app = http.createServer((request, response) => {
		if (request.method === 'GET' && request.url === '/messages.json') {
			collection.find().toArray((error,results) => {
				if (error) return console.error(error)
				response.writeHead(200,{ 'Content-Type': 'text/plain'})
				console.dir(results)
				response.end(JSON.stringify(results))
			})
		} else if (request.method === 'POST' && request.url === '/messages.json') {
			request.on('data', (data) => {
				collection.insert(querystring.parse(data.toString('utf-8')), {safe:true}, 
				  (error, obj) => {
					if (error) return console.error(error)
					response.end(JSON.stringify(obj))
				})
			})
		} else {
			response.end('Supported endpoints: \n/messages/list.json\n/messages/create.json')
		}
	})
	const port = process.env.PORT || 1337
	app.listen(port)
})
