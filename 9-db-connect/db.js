var util = require('util')
var mongodb = require ('mongodb')
var Db = mongodb.Db
var Connection = mongodb.Connection
var Server = mongodb.Server
var host = '127.0.0.1'
var port = 27017

// Script that will work on Heroku with MongoHQ/Compose

/*
var dbConnUrl = process.env.MONGOHQ_URL ||
  'mongodb://127.0.0.1:27017'
var host = url.parse(dbConnUrl).hostname
var port = new Number(url.parse(dbConnUrl).port)
*/

var db=new Db ('test', new Server(host, port, {}))
db.open(function(error, connection){
	console.log('error: ', error)
	var adminDb = db.admin()
	adminDb.listDatabases(function(err, dbs) {
    console.log('error: ', error)
		console.log('databases: ', dbs.databases)
    db.close()
  })
})
