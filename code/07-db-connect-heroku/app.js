const util = require('util')
const url = require('url')
const client = require ('mongodb').MongoClient

// Script that will work on Heroku with MongoLab

const dbConnUrl = process.env.MONGOLAB_URI ||
  'mongodb://127.0.0.1:27017/test'

console.log('db server: ', dbConnUrl)

client.connect(dbConnUrl, {}, (error, db) => {
  console.log('error: ', error)
  db.listCollections().toArray((err, collections) => {
    console.log('error: ', error)
    console.log('collections: ', collections)
    db.close()
  })
})
