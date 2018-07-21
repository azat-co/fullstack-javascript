<span id="intro-to-mongodb" class="anchor"></span>

CHAPTER 7
---------

Intro to MongoDB
================

> *What is Oracle? A bunch of people. And all of our products were just ideas in the heads of those people - ideas that people typed into a computer, tested, and that turned out to be the best idea for a database or for a programming language.*
>
> — [Larry Ellison](https://en.wikipedia.org/wiki/Larry_Ellison)

In this chapter, we'll explore the following topics:

-   MongoDB shell
-   MongoDB Native Node.js Driver
-   MongoDB on Heroku with MongoLab
-   Message Board: MongoDB version

MongoDB is a NoSQL document-store database. It is scalable and performant. It has no schema so all the logic and relationships are implemented in the application layer. You can use object-document mappers (ODMs) like Waterline or Mongoose for that schema, validation and business logic implementation in Node.js.

What's good about MongoDB in addition to its scaling and performance is that MongoDB uses a JavaScript interface, which completes the full stack JavaScript stack puzzle of browser, server, and the database layers. With MongoDB we can use one language for all three layers. The easiest way to get started with MongoDB is to use its shell, a.k.a. REPL (read-eval-print-loop).

MongoDB Shell
===================================================================================================

If you haven't done so already, please install the latest version of MongoDB from <https://www.mongodb.com/download-center>. For more instructions, please refer to the "Database: MongoDB" section in Chapter 2. You might have to create a data folder per the instructions.

Now from the folder where you unpacked the archive, launch the `mongod` service with:

`$ ./bin/mongod`

You should be able to see information in your terminal and in the browser at localhost:28017.

For the MongoDB shell, or `mongo`, launch in a new terminal window (**important!**) and at the same folder this command:

`$ ./bin/mongo`

You should see something like this, depending on your version of the MongoDB shell (`$ mongo --version` or after `$ mongo`):

```
MongoDB shell version: 3.0.6
connecting to: test
```

To test the database, use the JavaScript-like interface and commands `save` and `find`:

```
> db.test.save( { a: 1 } )
> db.test.find()
```

Again, more detailed step-by-step instructions are available in the "Database: MongoDB" section of Chapter 2.

The following are some other useful MongoDB shell commands, which I've referenced in a MongoDB and Mongoose cheatsheet that you can download in PDF for free at <https://gum.co/mongodb/git-874e6fb4> or view online at <http://bit.ly/2LatWtP>. Here's the short version of the reference:

-   `> show dbs`: Show databases on the server
-   `> use DB_NAME`: Select database `DB_NAME`
-   `> show collections`: Show collections in the selected database
-   `> db.COLLECTION_NAME.find()`: Perform the find query on collection with the `COLLECTION_NAME` name to find any items
-   `> db.COLLECTION_NAME.find({"_id": ObjectId("549d9a3081d0f07866fdaac6")})`: Perform the find query on collection with the `COLLECTION_NAME` name to find item with ID `549d9a3081d0f07866fdaac6`
-   `> db.COLLECTION_NAME.find({"email": /gmail/})`: Perform the find query on collection with the `COLLECTION_NAME` name to find items with e-mail property matching `/gmail/` regular expression, e.g., `bob@gmail.com` or `john@gmail.in`
-   `> db.COLLECTION_NAME.update(QUERY_OBJECT, SET_OBJECT)`: Perform the update query on collection with the `COLLECTION_NAME` name to update items that match `QUERY_OBJECT` with `SET_OBJECT`
-   `> db.COLLECTION_NAME.remove(QUERY_OBJECT)`: Perform remove query for items matching QUERY_OBJECT criteria on the `COLLECTION_NAME` collection
-   `> db.COLLECTION_NAME.insert(OBJECT)`: Add `OBJECT` to the collection with the COLLECTION_NAME name

So starting from a fresh shell session, you can execute these commands to create a document, change it, and remove it:

`> help`
`> show dbs`
`> use board`
`> show collections`
`> db.messages.remove();`
`> var a = db.messages.findOne();`
`> printjson(a);`
`> a.message = "hi";`
`> a.name = "John";`
`> db.messages.save(a);`
`> db.messages.find({});`
`> db.messages.update({name: "John"},{$set: {message: "bye"}});`
`> db.messages.find({name: "John"});`
`> db.messages.remove({name: "John"});`

MongoDB uses a special data format called BSON that has special types and one of them is Object ID. Let's cover it briefly next.

BSON Object ID
====

Binary JSON, or BSON, is a special data type that MongoDB utilizes. It is like JSON in notation but has support for additional, more sophisticated data types such as buffer or date.

A word of caution about BSON's Object ID: `ObjectId` in MongoDB shell and many other MongoDB driver is an equivalent to `ObjectID` in MongoDB Native Node.js Driver. Make sure to use the proper case and don't confuse the two, otherwise you'll get an error.

For example, in a Node.js code with the native driver use `ObjectID()`:

```js
const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectID
collection.findOne({_id: new ObjectID(idString)}, console.log)
```

On the other hand, in the MongoDB shell and many other MongoDB libraries like Mongoose, we employ `ObjectId()`. The following is the MongoDB shell code:

```
db.messages.findOne({_id: ObjectId(idStr)});
```

The following is a Node.js code with Mongoose:

```js
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Car = new Schema({ driver: ObjectId })
```

**Note** Mongoose is a very powerful library for Node.js and MongoDB. It has validation, pre and post hooks, schemas and many more features. I wrote a whole chapter on Mongoose in my new book *Practical Node.js, 2nd Edition* (Apress, 2018). Get and read my book to learn more about Mongoose at: <http://bit.ly/2LdCNL3> and <https://github.com/azat-co/practicalnode>.

MongoDB Native Driver
=====================

We'll use MongoDB Native Node.js Driver (<https://github.com/christkv/node-mongodb-native>) to access MongoDB from Node.js applications. This will add persistence to Node.js apps meaning apps will save and retrieve data from a permanent location instead of relying on an ephemeral in-memory store. To install MongoDB Native Node.js Driver , use:

`$ npm install mongodb`

Keep in mind that the preceding command is to install the driver library, not the database. I taught many workshops and in almost every one of them there would be a person who would confuse installing `mongodb` using npm with installing a database. Don't be this person. We need both, the database and the npm library. I already covered the database installation. If you have any issue with installing the driver, read the details are at <https://mongodb.github.io/node-mongodb-native>.

Don't forget to include the dependency in the `package.json` file as well, either with `-SE` or manually, so that you have the file resembling this:

```json
{
  "name": "node-example",
  "version": "0.0.1",
  "dependencies": {
    "mongodb":"3.x",
    ...
  },
  "engines": {
    "node": ">=8.x"
  }
}
```

Alternatively, for your own development you could use other mappers, which are available as an extension of the Native Driver:

-   `mongoskin` (<https://npmjs.org/node-mongoskin>): Future layer for `node-mongodb-native`
-   `mongoose` (<https://npmjs.org/mongoose> and <http://mongoosejs.com>): Asynchronous JavaScript driver with optional support for modeling
-   `mongolia` (<https://npmjs.org/mongolia>): Lightweight MongoDB ORM/driver wrapper
-   `monk` (<https://npmjs.org/monk>): Tiny layer that provides simple yet substantial usability improvements for MongoDB usage within Node.js

This small example will test if we can connect to a local MongoDB instance from a Node.js script. Create a Node.js file `app.js`. After we install the library with npm, we can include the `mongodb` library in our `app.js` file:

```js
const util = require('util')
const mongodb = require ('mongodb')
```

This is one of the ways to establish a connection to the MongoDB server in which the `db` variable will hold a reference to the database at a specified host and port:

```js
const Db = mongodb.Db
const Connection = mongodb.Connection
const Server = mongodb.Server
const host = '127.0.0.1'
const port = 27017

const db = new Db ('test', new Server(host,port, {}))
```

To actually open a connection:

```js
db.open((error, connection) => {
  // Do something with the database here
  db.close()
})
```

To check that we have the connection, we need to handle `error`. Also, let's get the admin object with `db.admin()` and fetch the list of databases with `listDatabases()`:

```js
const db = new Db ('test', new Server(host, port, {}))
db.open((error, connection) => {
  console.log('error: ', error)
  const adminDb = db.admin()
  adminDb.listDatabases((error, dbs) => {
    console.log('error: ', error)
    console.log('databases: ', dbs.databases)
    db.close()
  })
})
```

If we run it with `$ node app.js`, it should output "connected" in the terminal. When you're in doubt and need to check the properties of an object, there is a useful method in the `util` module:

```js
console.log(util.inspect(db))
```

Now you might want to set up the database in the cloud and test the connection from your Node.js script.

MongoDB on Heroku: MongoLab
==================================================================================================================================

Now that you've made the application that displays "connected" work locally, it's time to slightly modify it and deploy it to the Heroku PaaS (cloud). The database will also be in the cloud. I recommend using the MongoLab add-on, which provides ready-to-use MongoDB instances that integrate well with Heroku apps (<https://elements.heroku.com/addons/mongolab>). MongoLab (or mLab) also has a very convenient browser-based GUI to look up and manipulate the data and collections.

**Note** You might have to provide your credit card information to use MongoLab even if you select the free version. You should not be charged for a free plan, though.

In order to connect to the database server, there is a database connection URL (a.k.a. MongoLab URL/URI), which is a way to transfer all of the necessary information to make a connection to the database in one string.

The database connection string `MONGOLAB_URI` has the following format:

```
mongodb://user:pass@server_NAME.mongolab.com:PORT/db_name
```

You could either copy the MongoLab URL string from the Heroku web site (and hard-code it) or get the string from the Node.js `process.env` object:

```js
process.env.MONGOLAB_URI
```

or

```js
const connectionUri = url.parse(process.env.MONGOLAB_URI)
```

The global object `process` gives access to environment variables via `process.env`. Heroku and Heroku add-ons like mLabs use these environment variables to pass database host names and ports, passwords, API keys, port numbers, and other system information that shouldn't be hard-coded into the main logic.

To make our code work both locally and on Heroku, we can use the logical OR operator `||` and assign a local host and port if environment variables are undefined:

```js
const port = process.env.PORT || 1337
const dbConnUrl = process.env.MONGOLAB_URI ||
  'mongodb://127.0.0.1:27017/test'
```

Here is our updated cross-environment-ready `app.js` file (<http://bit.ly/2LeezQT>). I added a method to get the list of collections `listCollections` instead of getting the list of the databases (we have only one database in MongoLab right now):

```js
const util = require('util')
const url = require('url')
const client = require ('mongodb').MongoClient

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
```

Following the modification of `app.js` by addition of `MONGOLAB_URI`, we can now initialize the Git repository, create a Heroku app, add the MongoLab add-on to it, and deploy the app with Git.

Utilize the same steps as in the previous examples to create a new Git repository:

```
$ git init
$ git add .
$ git commit -am 'initial commit'
```

Create the Cedar Stack Heroku app:

```
$ heroku create
```

If everything went well you should be able to see a message that tells you the new Heroku app name (and URL) along with a message that the Heroku remote destination was added. Having remote in your local Git project is crucial because that's you'll deploy the app to Heroku. You can always check a list of remotes by executing this command from the root of our project:

```
$ git remote show
```

Add-ons work on a per app basis not on a per account basis. To install the free MongoLab on the existing Heroku app (), use:

```
$ heroku addons:create mongolab:sandbox
```

Or log on to Heroku (<https://elements.heroku.com/addons/mongolab>) with your Heroku credentials and choose MongoLab Free for that particular Heroku app, if you know the name of that app.

The project folder needs to have `Procfile` and `package.json`. You can copy them from `code/07-db-connect-heroku` or <http://bit.ly/2LeezQT>.

Now you can push your code to Heroku with:

```
$ git push heroku master
```

Enjoy seeing the logs that tell you that the deploy was successful. For additional logs and debugging, use this command:

```
$ heroku logs
```

The result will be something like this:

```
2019-12-01T12:34:51.438633+00:00 app[web.1]: db server:  mongodb://heroku_cxgh54g6:9d76gspc45v899i44sm6bn790c@ds035617.mongolab.com:34457/heroku_cxgh54g6
2019-12-01T12:34:53.264530+00:00 app[web.1]: error:  null
2019-12-01T12:34:53.236398+00:00 app[web.1]: error:  null
2019-12-01T12:34:53.271775+00:00 app[web.1]: collections:  [ { name: 'system.indexes', options: {} },
2019-12-01T12:34:53.271778+00:00 app[web.1]:   { name: 'test', options: { autoIndexId: true } } ]
```

So far you have implemented a local `app.js` file (`code/07-db-connect/app.js` or <http://bit.ly/2LhLrZm>). You enhanced it to work in the cloud (`code/07-db-connect-heroku/app.js` or <http://bit.ly/2LgX5Dy>). You learned how to build Node.js programs which work with MongoDB. Great work!

Let's enhance the latest `app.js` file by adding an HTTP server. After you get the `app.js` and the modified `app.js` files working, you modify the `app.js` to add a server so that the "connected" message will be displayed in the browser instead of the terminal window. To do so, we'll wrap the server object instantiation in a database connection callback. The final implementation is in the file `code/07-db-server/app.js` or at the book's GitHub repository: <http://bit.ly/2LcTd6K>.

Supplemental video which walks you through the implementation and demonstrates the project: <http://bit.ly/1Qnrmwr>.

```js
const util = require('util')
const url = require('url')
const http = require('http')
const mongodb = require ('mongodb')
const client = require ('mongodb').MongoClient

const port = process.env.PORT || 1337
const dbConnUrl = process.env.MONGOLAB_URI || 'mongodb://@127.0.0.1:27017/test'

client.connect(dbConnUrl, {}, function(error, db) {
    console.log('error: ', error)
    db.listCollections().toArray(function(error, collections) {
    console.log('error: ', error)
        console.log('collections: ', collections)
        const server = http.createServer(function (request, response) { // Creates server
          response.writeHead(200, {'Content-Type': 'text/plain'})   // Sets the right header and status code
          response.end(util.inspect(collections))  // Outputs string with line end symbol
        })
        server.listen(port, function() {
            console.log('Server is running at %s:%s ', server.address().address, server.address().port) // Sets port and IP address of the server
        })
    db.close()
    })
})
```

After the deployment you should be able to open the URL provided by Heroku and see the list of collections. If it's a newly created app with an empty database, there would be no collections. You can create a collection using the MongoLab web interface in Heroku, then check in your app. You can use Mongo shell to connect to mLab too, e.g.,

```
mongo --username alice --password dolphin --host mongodb0.herokuserverapp.com --port 28015
```

Message Board: MongoDB Version
==============================

We should have everything set up for writing the Node.js application that will work both locally and on Heroku. The source code is available in the folder `code/07-board-api-mongo` and at <http://bit.ly/2LbCtfX>. The structure of the application is as simple as:

```
/07-board-api-mongo
  web.js
  Procfile
  package.json
```

This is what `web.js` looks like; first we include our libraries:

```js
const http = require('http')
const util = require('util')
const querystring = require('querystring')
const client = require('mongodb').MongoClient
```

Then put out a magic string to connect to MongoDB:

`const uri = process.env.MONGOLAB_URI || 'mongodb://@127.0.0.1:27017/messages'`

**Note** The URI/URL format contains the optional database name in which our collection will be stored. Feel free to change it to something else: for example, `rpjs` or `test`.

We put all the logic inside of an open connection in the form of a callback function:

```js
client.connect(uri, (error, db) => {
  if (error) return console.error(error)
```

We are getting the collection with the next statement:

```js
const collection = db.collection('messages')
```

Now we can instantiate the server and set up logic to process our endpoints/routes. We need to fetch the documents on GET `/messages.json`:

```js
  const app = http.createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/messages.json') {
      collection.find().toArray((error,results) => {
        response.writeHead(200,{ 'Content-Type': 'text/plain'})
          console.dir(results)
          response.end(JSON.stringify(results))
      })
```

On the POST `/messages.json`, we insert the document:

```js
    } else if (request.method === 'POST' && request.url === '/messages.json') {
      request.on('data', (data) => {
        collection.insert(querystring.parse(data.toString('utf-8')), {safe:true}, function     (error, obj) {
            if (error) throw error
            response.end(JSON.stringify(obj))
          })
        })
    } else {
```

This will be shown in the event that the client request does not match any of the conditions above. This is a good reminder for us when we try to go to <http://localhost:1337> instead of <http://localhost:1337/messages.json> and there are no messages:

```js
      response.end('Supported endpoints: \n/messages.json\n/messages.json')
    }
  })
  const port = process.env.PORT || 1337
  app.listen(port)
})
```

**Note** We don't have to use additional words after the collection/entity name; that is, instead of `/messages.json` it's perfectly fine to have just `/messages` for all the HTTP methods such as GET, POST, PUT, and DELETE. The main reason why many developers and I use `.json` is to be explicit with the format that needs to be returned back. Another way to be explicit is to use `Accept` header set to `application/json`. If you change the endpoints to just `/messages` in your Node.js application code, make sure you update URLs in the provided CURL commands and the supplied Message Board front-end code.

To test via CURL terminal commands run:

`$ curl http://localhost:5000/messages.json`

Or open your browser at the <http://locahost:1337/messages.json> location.

It should give you an empty array (`[]`), which is fine. Then POST a new message:

`$ curl  -d "username=BOB&message=test" http://localhost:5000/messages.json`

Now we must see a response containing an ObjectID of a newly created element, for example:

```
[{"username":"BOB","message":"test","_id":"51edcad45862430000000001"}]
```

Your `ObjectId` will be different. :-)

If everything works as it should locally, try to deploy it to Heroku.

To test the application on Heroku, you could use the same [CURL](https://curl.haxx.se/docs/manpage.html) commands (https://curl.haxx.se/docs/manpage.html), substituting <http://localhost> or <http://127.0.0.1> with your unique Heroku app's host/URL:

```
$ curl http://your-app-name.herokuapp.com/messages.json
$ curl -d "username=BOB&message=test" http://your-app-name.herokuapp.com/messages.json
```

It's also nice to double check the database either via Mongo shell: `$ mongo` terminal command and then `use twitter-clone` and `db.messages.find()`; or via Compass (<http://bit.ly/2Lft3Qs>), my tool `mongoui` (<https://github.com/azat-co/mongoui>), `mongo-express` (<https://npmjs.org/mongo-express>) or in case of MongoLab through its web interface accessible at the Heroku website.

If you would like to use another domain name instead of http://your-app-name.herokuapp.com, you'll need to do two things:

1.  Tell Heroku your domain name:

    `$ heroku domains:add www.your-domain-name.com`

2.  Add the CNAME DNS record in your DNS manager to point
    to http://your-app-name.herokuapp.com.

Custom domains will hide the fact that your application is hosted on Heroku. For more information on custom domains can be found at <https://devcenter.heroku.com/articles/custom-domains>.

**Tip** For more productive and efficient development we should automate as much as possible; that is, use tests instead of CURL commands Use HTTP libraries such as `axios`, `superagent` or `request` to test your REST APIs. They are a timesaver for such tasks. There is a chapter on the Mocha library and Node.js testing in my other best-selling book *Practical Node.js, 2nd Edition* (Apress, 2018): <http://bit.ly/2LdCNL3> and <https://github.com/azat-co/practicalnode>.

Summary
=======

In this chapter we covered the MongoDB database and its shell. MongoDB uses an extended version of JSON, which is called BSON. Then we switched to Node.js with the native MongoDB driver. Many other MongoDB Node.js libraries depend on the native driver and build on top of it. For this reason, it's good to know it. To use MongoDB on Heroku, we utilized the MongoLab add-on (the magical `MONGOLAB_URI`). Finally, we used the acquired knowledge to add database store (persistence) to the Message Boards application.
