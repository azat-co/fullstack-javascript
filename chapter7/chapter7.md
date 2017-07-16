<span id="intro-to-mongodb" class="anchor"></span>

CHAPTER 7
---------

Intro to MongoDB
================

> *What is Oracle? A bunch of people. And all of our products were just
> ideas in the heads of those people - ideas that people typed into a
> computer, tested, and that turned out to be the best idea for a
> database or for a programming language.*
>
> — [Larry Ellison](https://en.wikipedia.org/wiki/Larry_Ellison)

In this chapter, we'll explore the following topics:

-   MongoDB Shell

-   MongoDB Native Driver for Node.js

-   MongoDB on Heroku with MongoLab

-   Message Board: MongoDB Version

MongoDB is a NoSQL document-store database. It is scalable and
performant. It has no schema so all the logic and relationships are
implemented in the application layer. You can use ODMs like Waterline or
Mongoose for that. MongoDB uses JavaScript interface, which completes
the full stack JavaScript stack puzzle of browser, server, and the
database layers. With MongoDB we can use one language for all three
layers. The easiest way to get started with MongoDB is to use its shell,
a.k.a. REPL (read-eval-print-loop).

<span id="mongodb-shell" class="anchor"><span id="shell" class="anchor"></span></span>MongoDB Shell
===================================================================================================

If you haven't done so already, please install the latest version of
MongoDB from [mongodb.org/downloads](http://www.mongodb.org/downloads).
For more instructions, please refer to the Database:MongoDB section in
Chapter 2. You might have to create a data folder per instructions.

Now from the folder where you unpacked the archive, launch the `mongod`
service with:

`$ ./bin/mongod`

You should be able to see information in your terminal and in the
browser at localhost:28017.

For the MongoDB shell, or `mongo`, launch in a new terminal window
(**important!**), and at the same folder this command:

`$ ./bin/mongo`

You should see something like this, depending on your version of the
MongoDB shell:

`MongoDB shell version: 2.0.6`  
`connecting to: test`

To test the database, use the JavaScript-like interface and commands
`save` and `find`:

`> db.test.save( { a: 1 } )`  
`> db.test.find()`

More detailed step-by-step instructions are available in the
Database:MongoDB section of Chapter 2.

Some other useful MongoDB shell commands from MongoDB and Mongoose
cheatsheet (https://gum.co/mongodb/git-874e6fb4):

-   `> show dbs`: show databases on the server

-   `> use DB_NAME`: select database `DB_NAME`

-   `> show collections`: show collections in the selected database

-   `> db.COLLECTION_NAME.find()`: perform the find query on
    collection with the COLLECTION\_NAME name to find any items

-   `> db.COLLECTION_NAME.find({"_id": ObjectId("549d9a3081d0f07866fdaac6")})`:
    perform the find query on collection with the COLLECTION\_NAME name
    to find item with ID 549d9a3081d0f07866fdaac6

-   `> db.COLLECTION_NAME.find({"email": /gmail/})`: perform the
    find query on collection with the COLLECTION_NAME name to find
    items with e-mail property matching `/gmail/` regular expression, e.g., bob@gmail.com or john@gmail.in 

-   `> db.COLLECTION_NAME.update(QUERY_OBJECT, SET_OBJECT)`: perform
    the update query on collection with the COLLECTION\_NAME name to
    update items that match QUERY\_OBJECT with SET\_OBJECT

-   `> db.COLLECTION_NAME.remove(QUERY_OBJECT)`: perform remove
    query for items matching QUERY\_OBJECT criteria on the
    COLLECTION\_NAME collection

-   `> db.COLLECTION_NAME.insert(OBJECT)`: add OBJECT to the
    collection with the COLLECTION\_NAME name

So starting from a fresh shell session, you can execute these commands
to create a document, change it, and remove:

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

You can download the MongoDB and Mongoose cheatsheet as a
[PDF](https://gum.co/mongodb/fsjs-CB07C579)
(https://gumroad.com/l/mongodb/fsjs-CB07C579\#) or view it
[online](https://github.com/azat-co/cheatsheets/tree/master/mongodb-mongoose)
at https://github.com/mongodb/node-mongodb-native/\#data-types.

A full overview of the MongoDB interactive shell is available at
mongodb.org: [Overview – The MongoDB Interactive
Shell](http://www.mongodb.org/display/DOCS/Overview+-+The+MongoDB+Interactive+Shell)
(https://docs.mongodb.org/manual/tutorial/getting-started-with-the-mongo-shell/).

BSON
====

Binary JSON, or BSON, is a special data type that MongoDB utilizes. It
is like JSON in notation but has support for additional more
sophisticated data types such as buffer or date.

A word of caution about BSON: ObjectId in MongoDB is an equivalent to
ObjectID in MongoDB Native Node.js Driver (i.e., make sure to use the
proper case). Otherwise you'll get an error. More on the types:
[ObjectId in MongoDB](http://www.mongodb.org/display/DOCS/Object+IDs)
(http://www.mongodb.org/ display/DOCS/Object+IDs) vs [Data Types in
MongoDB Native Node.js
Drier](https://github.com/mongodb/node-mongodb-native/#data-types)
(https://github.com/mongodb/node-mongodb-native/\#data-types ). Example
of Node.js code with mongodb.ObjectID() : collection.findOne({\_id: new
ObjectID(idString)}, console.log) // ok . On the other hand, in the
MongoDB shell, we employ: db.messages.findOne({\_id:ObjectId(idStr)}); .

MongoDB Native Driver
=====================

<span id="OLE_LINK26" class="anchor"><span id="OLE_LINK27"
class="anchor"><span id="OLE_LINK36" class="anchor"><span
id="nativedrive" class="anchor"></span></span></span></span>Supplemental
video which walks you through the implementation and demonstrates the
project: http://bit.ly/1QnqZSk.

We'll use Node.js Native Driver for MongoDB
(<https://github.com/christkv/node-mongodb-native>) to access MongoDB
from Node.js applications. Full documentation is also available at
<http://mongodb.github.com/node-mongodb-native/api-generated/db.html>.

To install MongoDB Native driver for Node.js, use:

`$ npm install mongodb`

More details are at <http://www.mongodb.org/display/DOCS/node.JS>.

Don't forget to include the dependency in the `package.json` file as
well:

```
{  
  "name": "node-example",  
  "version": "0.0.1",
  "dependencies": {
    "mongodb":"",
    ...
  },
  "engines": {
    "node": ">=0.6.x"
  }
}
```

Alternatively, for your own development you could use other mappers,
which are available as an extension of the Native Driver:

-   [Mongoskin](https://github.com/guileen/node-mongoskin)
    (https://github.com/guileen/node-mongoskin): a future layer for
    node-mongodb-native

-   [Mongoose](http://mongoosejs.com/) (http://mongoosejs.com/): an
    asynchronous JavaScript driver with optional support for modeling

-   [Mongolia](https://github.com/masylum/mongolia)
    (https://github.com/masylum/mongolia): a lightweight MongoDB
    ORM/driver wrapper

-   [Monk](https://github.com/LearnBoost/monk)
    (https://github.com/Automattic/monk): a tiny layer that provides
    simple yet substantial usability improvements for MongoDB usage
    within Node.js

This small example will test if we can connect to local MongoDB instance
from a Node.js script.

After we install the library, we can include the `mongodb` library in
our `app.js` file:

```
var util = require('util')
var mongodb = require ('mongodb')
```

This is one of the ways to establish connection to the MongoDB server in
which the db variable will hold reference to the database at a specified
host and port:

```
var Db = mongodb.Db
var Connection = mongodb.Connection
var Server = mongodb.Server
var host = '127.0.0.1'
var port = 27017

var db=new Db ('test', new Server(host,port, {}))
```

To actually open a connection:

```
db.open(function(error, connection) {
  // Do something with the database here
  db.close()
})
```

To check that we have the connection, we need to handle `error`. Also,
let's get the admin object with `db.admin``(``)` and fetch the list of
databases with `listDatabases``()`:

```
var db=new Db ('test', new Server(host, port, {}))
db.open(function(error, connection){
    console.log('error: ', error)
    var adminDb = db.admin()
    adminDb.listDatabases(function(error, dbs) {
    console.log('error: ', error)
        console.log('databases: ', dbs.databases)
    db.close()
  })
})
```

This code snippet is available at
<https://github.com/mongodb/node-mongodb-native/\#data-types>. If we run
it, it should output "connected" in the terminal. When you're in doubt
and need to check the properties of an object, there is a useful method
in the `util` module:

`console.log(util.inspect(db))`

Now you might want to set up the database in the cloud and test the
connection from your Node.js script.

<span id="mongodb-on-heroku-mongolab." class="anchor"><span id="mongolab" class="anchor"></span></span>MongoDB on Heroku: MongoLab
==================================================================================================================================

<span id="OLE_LINK55" class="anchor"><span id="OLE_LINK56"
class="anchor"></span></span>Supplemental video which walks you through
the implementation and demonstrates the project: http://bit.ly/1Qnr8Fn.

After you made your application that displays 'connected' work locally,
it's time to slightly modify it and deploy to the platform as a service
(i.e., Heroku).

We recommend using the MongoLab add-on
(https://elements.heroku.com/addons/mongolab). MongoLab add-on provides
a browser-based GUI to look up and manipulate the data and collections.
More information is available at
<https://elements.heroku.com/addons/mongolab#docs>.

Note: You might have to provide your credit card information to use
MongoLab even if you select the free version. You should not be charged,
though.

In order to connect to the database server, there is a database
connection URL (a.k.a. MongoLab URL/URI), which is a way to transfer all
of the necessary information to make a connection to the database in one
string.

The database connection string `MONGOLAB_URI` has the following format:

    mongodb://user:pass@server_NAME.mongolab.com:PORT/db_name

You could either copy the MongoLab URL string from the Heroku web site
(and hard-code it) or get the string from the Node.js `process.env`
object:

`process.env.MONGOLAB_URI`

or

`var connectionUri = url.parse(process.env.MONGOLAB_URI)`

The global object process gives access to environment variables via
`process.env`. Those variables conventionally used to pass database host
names and ports, passwords, API keys, port numbers, and other system
information that shouldn't be hard-coded into the main logic.

To make our code work both locally and on Heroku, we can use the logical
OR operator `||` and assign a local host and port if environment
variables are undefined:

```
var port = process.env.PORT || 1337
var dbConnUrl = process.env.MONGOLAB_URI ||
  'mongodb://127.0.0.1:27017/test'
```

Here is our updated cross-environment ready `app.js` file
(https://github.com/azat-co/fullstack-javascript/tree/master/10-db-connect-heroku).
I added a method to get the list of collections `listCollections`
instead of getting the list of the databases (we have only one database
in MongoLab right now):

```
var util = require('util')
var url = require('url')
var client = require ('mongodb').MongoClient
  
var dbConnUrl = process.env.MONGOLAB_URI ||
  'mongodb://127.0.0.1:27017/test'
  
console.log('db server: ', dbConnUrl)  
  
client.connect(dbConnUrl, {}, function(error, db){  
    console.log('error: ', error)  
    db.listCollections().toArray(function(err, collections) {  
    console.log('error: ', error)  
        console.log('collections: ', collections)  
    db.close()  
    })  
})
```

Following the modification of `app.js` by addition of `MONGOLAB_URI`, we
can now initialize Git repository, create a Heroku app, add the MongoLab
add-on to it, and deploy the app with Git.

Utilize the same steps as in the previous examples to create a new git
repository:

```
$ git init  
$ git add .  
$ git commit -am 'initial commit'
```

Create the Cedar stack Heroku app:

`$ heroku create`

If everything went well you should be able to see a message that tell
you the new Heroku app name (and URL) along with a message that remote
was added. Having remote in your local git is crucial; you can always
check a list of remote by:

`$ git remote show`

To install free MongoLab on the existing Heroku app (add-ons work on a
per app basis), use:

`$ heroku addons:create mongolab:sandbox`

Or log on to Heroku (https://elements.heroku.com/addons/mongolab) with
your Heroku credentials and choose MongoLab Free for that particular
Heroku app, if you know the name of that app.

The project folder needs to have `Procfile` and `package.json`. You can
copy them from
https://github.com/azat-co/fullstack-javascript/tree/master/10-db-connect-heroku.

Now you can push you code to Heroku with:

`$ git push heroku master`

Enjoy the the log that should tell you that the deploy was successful.
Now see the output with this command:

`$ heroku logs`

The result will be something like this:

```
2015-12-01T12:34:51.438633+00:00 app[web.1]: db server:  mongodb://heroku_cxgh54g6:9d76gspc45v899i44sm6bn790c@ds035617.mongolab.com:34457/heroku_cxgh54g6  
2015-12-01T12:34:53.264530+00:00 app[web.1]: error:  null  
2015-12-01T12:34:53.236398+00:00 app[web.1]: error:  null  
2015-12-01T12:34:53.271775+00:00 app[web.1]: collections:  [ { name: 'system.indexes', options: {} },  
2015-12-01T12:34:53.271778+00:00 app[web.1]:   { name: 'test', options: { autoIndexId: true } } ]
```

If you get `app.js` and modified `app.js` files working, let's enhance
by adding a HTTP server, so the 'connected' message will be displayed in
the browser instead of the terminal window. To do so, we'll wrap the
server object instantiation in a database connection callback (file
11-db-server/app.js at
<https://github.com/azat-co/fullstack-javascript/blob/master/11-db/app.js>).

Supplemental video which walks you through the implementation and
demonstrates the project: <http://bit.ly/1Qnrmwr>.

```
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
            console.log('Server is running at %s:%s ', server.address().address, server.address().port) // Sets port and IP address of the server  
        })  
    db.close()  
    })  
})
```

The final Heroku-deployment-ready project is located at
https://github.com/azat-co/fullstack-javascript/tree/master/11-db-serverunder.

After the deployment you should be able to open the URL provided by
Heroku and see the list of collections. If it's a newly created app with
an empty database, there would be no collections. You can create a
collection using the MongoLab web interface in Heroku.

For more information on the native MongoDB driver, check out
http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html

Message Board: MongoDB Version
==============================

<span id="board" class="anchor"></span>Supplemental video which walks
you through the implementation and demonstrates the project:
http://bit.ly/1QnsfoE.

We should have everything set up for writing the Node.js application
that will work both locally and on Heroku. The source code is available
at
https://github.com/azat-co/fullstack-javascript/tree/master/12-board-api-mongonder.
The structure of the application is simple:

```
/12-board-api-mongo
  web.js  
  Procfile
  package.json
```

This is what `web.js` looks like; first we include our libraries:

```
var http = require('http')  
var util = require('util')  
var querystring = require('querystring')  
var client = require('mongodb').MongoClient
```

Then put out a magic string to connect to MongoDB:

`var uri = process.env.MONGOLAB_URI || 'mongodb://@127.0.0.1:27017/messages'`

Note: The URI/URL format contains the optional database name in which
our collection will be stored. Feel free to change it to something else:
for example, 'rpjs' or 'test'.

We put all the logic inside of an open connection in the form of a
callback function:

```
client.connect(uri, function(error, db) {
  if (error) return console.error(error)
```

We are getting the collection with the next statement:

`var collection = db.collection('messages')`

Now we can instantiate the server and set up logic to process our
endpoints/routes. We need to fetch the documents on GET
`/messages/``list.json`:

```
    var app = http.createServer( function (request, response) {  
        if (request.method === 'GET' && request.url === '/messages/list.json') {  
            collection.find().toArray(function(error,results) {  
                response.writeHead(200,{ 'Content-Type': 'text/plain'})  
                console.dir(results)  
                response.end(JSON.stringify(results))  
            })
```

On the POST `/messages/``create.json`, we inserting the document:

```
        } else if (request.method === 'POST' && request.url === '/messages/create.json') {  
            request.on('data', function(data) {  
                collection.insert(querystring.parse(data.toString('utf-8')), {safe:true}, function(error, obj) {  
                    if (error) throw error  
                    response.end(JSON.stringify(obj))  
                })  
            })  
        } else {
```

This will be shown in the event that the client request is not matching
any of the conditions above. This is a good reminder for us when we try
to go to the http://localhost:1337 instead of
http://localhost:1337/messages/list.json:

```
            response.end('Supported endpoints: \n/messages/list.json\n/messages/create.json')  
        }  
    })  
    var port = process.env.PORT || 1337  
    app.listen(port)  
})
```

Note: We don't have to use additional words after the collection/entity
name; that is, instead of `/`messages/list.json and
/messages/create.json it's perfectly fine to have just `/messages` for
all the HTTP methods such as GET, POST, PUT, DELETE. If you change them
in your application code make sure to use the updated CURL commands and
front-end code.

To test via CURL terminal commands run:

`$ curl http://localhost:5000/messages/list.json`

Or open your browser at the http://locahost:1337/messages/list.json
location.

It should give you an empty array: `[]``,` which is fine. Then POST a
new message:

`$ curl  -d "username=BOB&message=test" http://localhost:5000/messages/create.json`

Now we must see a response containing an ObjectID of a newly created
element, for example:
[{"username":"BOB","message":"test","_id":"51edcad45862430000000001"}].
Your ObjectId might vary.

If everything works as it should locally, try to deploy it to Heroku.

To test the application on Heroku, you could use the same
[CURL](http://curl.haxx.se/docs/manpage.html) commands
(http://curl.haxx.se/docs/manpage.html), substituting http://localhost
or "http://127.0.0.1" with your unique Heroku app's host/URL:

```
$ curl http://your-app-name.herokuapp.com/messages/list.json  
$ curl -d "username=BOB&message=test"  
  http://your-app-name.herokuapp.com/messages/create.json
```

It's also nice to double check the database either via Mongo shell:
`$ mongo` terminal command and then `use twitter-clone` and
`db.messages.find()`; or via MongoHub
(<https://github.com/bububa/MongoHub-Mac>), mongoui
(<https://github.com/azat-co/mongoui>),
mongo-express (<https://github.com/andzdroid/mongo-express>) or in case of
MongoLab through its web interface accessible at the heroku.com web
site.

If you would like to use another domain name instead of
http://your-app-name.herokuapp.com, you'll need to do two things:

1.  Tell Heroku your domain name:

    `$ heroku domains:add www.your-domain-name.com`

2.  Add the CNAME DNS record in your DNS manager to point
    to http://your-app-name.herokuapp.com.

More information on custom domains can be found at
[devcenter.heroku.com/articles/custom-domains](https://devcenter.heroku.com/articles/custom-domains)

Tip: For more productive and efficient development we should automate as
much as possible; that is, use tests instead of CURL commands. There is
an article on the Mocha library in the BONUS chapter that, along with
the `superagent` or `request` libraries, is a timesaver for such tasks.

Summary
=======

In this chapter we've covered the MongoDB database and its shell.
MongoDB uses an extended version of JSON, which is called BSON. Then we
switched to Node.js with the native MongoDB driver. Many other MongoDB
Node.js libraries depend on the native driver and build on top of it.
For this reason, it's good to know it. To use MongoDB on Heroku, we
utilized MongoLab add-on (the magical `MONGOLAB_URI`). Finally, we use
the acquired knowledge to add persistence to the Message Boards
application.
