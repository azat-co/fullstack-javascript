<span id="intro-to-node.js" class="anchor"></span>
CHAPTER 6
---------
Intro to Node.js
================

> *Any fool can write code that a computer can understand. Good
> programmers write code that humans can understand.*
>
> — [Martin Fowler](http://en.wikipedia.org/wiki/Martin_Fowler)

In this chapter, we'll cover the following:

-   Building "Hello World" in Node.js

-   Node.js Core Modules

-   npm Node Package Manager

-   Message Board with Node.js: Memory Store Version

-   Unit Testing Node.js

Node.js is a non-blocking platform for building web applications. It
uses JavaScript, so it's a centerpiece in our fullstack JavaScript
development. We'll start with Hello World and cover core modules and
npm. Then, we deploy our Hello World app to cloud.

Building "Hello World" in Node.js
=================================

<span id="OLE_LINK27" class="anchor"><span id="OLE_LINK26"
class="anchor"><span id="OLE_LINK36" class="anchor"><span
id="OLE_LINK38" class="anchor"><span id="OLE_LINK39"
class="anchor"><span id="buildinghelloworld"
class="anchor"></span></span></span></span></span></span>Supplemental
video which walks you through the implementation and demonstrates the
project: http://bit.ly/1QnqFmF.

To check if you have Node.js installed on your computer, type and
execute this command in your terminal:

    $ node -v

As of this writing, the latest version is 5.1.0. If you don't have
Node.js installed, or if your version is behind, you can download the
latest version at [nodejs.org/#download](http://nodejs.org/#download).
You can use one of these tools for version management (i.e., switching
between Node.js versions):

-   [n](https://github.com/tj/n) (<https://github.com/tj/n>)

-   [nave](https://github.com/isaacs/nave) (<https://github.com/isaacs/nave>)

-   [nvm](https://github.com/creationix/nvm) (<https://github.com/creationix/nvm>)

As usual, you could copy example code at
https://github.com/azat-co/fullstack-javascript/tree/master/07-hello, or
write your own program from scratch. If you wish to do the latter,
create a folder `hello` for your "Hello World" Node.js application. Then
create file a `server.js` and line by line type the code below.

This will load the core `http` module for the server (more on the
modules later):

    var http = require('http')

We'll need a port number for our Node.js server. To get it from the
environment or assign 1337 if the environment is not set, use:

    var port = process.env.PORT || 1337

This will create a server, and a callback function will contain the
response handler code:

    var server = http.createServer(function (req, res) {

To set the right header and status code, use:

      res.writeHead(200, {'Content-Type': 'text/plain'})

To output "Hello World" with the line end symbol, use:

      res.end('Hello World\n')
    })

To set a port and display the address of the server and the port number,
use:

    server.listen(port, function() {
      console.log('Server is running at %s:%s ',
        server.address().address, server.address().port)
    })

From the folder in which you have `server.js`, launch in your terminal
the following command:

    $ node server.js

Open [localhost:1337](http://localhost:1337/) or
[127.0.0.1:1337](http://127.0.0.1:1337/) or any other address you see in
the terminal as a result of `console.log()` function, and you should see
"Hello World" in a browser. To shut down the server, press Control + C.

Note: The name of the main file could be different from server.js (e.g.,
index.js or app.js). In case you need to launch the `app.js` file, just
use `$ node app.js`.

Node.js Core Modules
====================

Unlike other programming technologies, Node.js doesn't come with a heavy
standard library. The core modules of node.js are a bare minimum and the
rest can be cherry-picked via the Node Package Manager (NPM) registry.
The main core modules, classes, methods, and events include:

-   [http](http://nodejs.org/api/http.html)
    (<https://nodejs.org/api/http.html>): Module for working
    with HTTP protocol

-   [util](http://nodejs.org/api/util.html)
    (<https://nodejs.org/api/util.html>): Module with various helpers

-   [querystring](http://nodejs.org/api/querystring.html)
    (<https://nodejs.org/api/querystring.html>): Module for parsing query
    string from the URI

-   [url](http://nodejs.org/api/url.html)
    (<https://nodejs.org/api/url.html>): Module for parsing URI
    information

-   [fs](http://nodejs.org/api/fs.html)
    (<https://nodejs.org/api/fs.html>): Module for working with the file
    system

These are the most important core modules. Let's cover each of them.

### http


This is the main module responsible for Node.js HTTP server. Here are
the main methods:

-   `http.createServer()`: returns a new web server object

-   `http.listen()`: begins accepting connections on the specified
    port and hostname

-   `http.createClient()`: node app can be a client and make requests
    to other servers

-   `http.ServerRequest()`: incoming requests are passed to request
    handlers

    -   `data`: emitted when a piece of the message body is received

    -   `end`: emitted exactly once for each request

    -   `request.method()`: the request method as a string

    -   `request.url()`: request URL string

-   `http.ServerResponse()`: this object is created internally by an
    HTTP server—not by the user, and used as an output of request
    handlers

    -   `response.writeHead()`: sends a response header to the request

    -   `response.write()`: sends a response body

    -   `response.end()`: sends and ends a response body

### util


This module provides utilities for debugging. Some of the methods
include:

-   `util.inspect()`: Return a string representation of an object,
    which is useful for debugging

###querystring

This module provides utilities for dealing with query strings. Some of
the methods include:

-   `querystring.stringify()`: Serialize an object to a query string

-   `querystring.parse()`: Deserialize a query string to an object

### url

This module has utilities for URL resolution and parsing. Some of the
methods include:

-   `parse()`: Take a URL string, and return an object

### fs

fs handles file system operations such as reading and writing to/from
files. There are synchronous and asynchronous methods in the library.
Some of the methods include:

-   `fs.readFile()`: reads file asynchronously

-   `fs.writeFile()`: writes data to file asynchronously

There is no need to install or download core modules. To include them in
your application, all you need is to follow the syntax:

    var http = require('http')

The lists of non-core modules can be found at:

-   [npmjs.org](https://npmjs.org): Node Package Manager registry

-   Nipster (http://eirikb.github.io/nipster): NPM search
    [Nipster](http://eirikb.github.com/nipster/): NPM search tool for
    Node.js

-   [node-modules(http://node-modules.com): npm search engine
    ](node-modules(http://node-modules.com):%20npm%20search%20engine%20%20%20%20%20)

If you would like to know how to code your own modules, take a look at
the article located here:
https://quickleft.com/blog/creating-and-publishing-a-node-js-module/ .

npm Node Package Manager
------------------------

<span id="manager" class="anchor"></span>Node Package Manager, or NPM,
manages dependencies and installs modules for you. Node.js installation
comes with NPM, whose web site is [npmjs.org](http://npmjs.org/).

`package.json` contains meta information about our Node.js application
such as a version number; author name; and, most important, what
dependencies we use in the application. All of that information is in
the JSON formatted object, which is read by NPM.

If you would like to install packages and dependencies specified in
`package.json`, type:

    $ npm install

A typical `package.json` file might look like this:

    {
       "name": "Blerg",
       "description": "Blerg blerg blerg.",
       "version": "0.0.1",
       "author": {
          "name" : "John Doe",
          "email" : "john.doe@gmail.com"
       },
       "repository": {
           "type": "git",
           "url": "http://github.com/johndoe/blerg.git"
       },
       "engines": [
           "node >= 0.6.2"
       ],
       "scripts": {
         "start": "server.js"
       },
       "license" : "MIT",
       "dependencies": {
           "express": ">= 2.5.6",
           "mustache": "0.4.0",
           "commander": "0.5.2"
       },
       "bin" : {
           "blerg" : "./cli.js"
       }
    }

While most of the properties in the `package.json` example above like
`description` and `name` are self-explanatory, others deserve more
explaining. Dependencies is an object, and each item has the name on the
left side and the version number on the right side (e.g., "express":
"&gt;= 2.5.6"). The version can be exact: for example, "express":
"2.5.6," or greater than, or wild-card, for example, "express": "\*" (a
great way to blow up your app in production with new untested
dependencies: therefore not recommended).

The `bin` property is for command-line utilities. It tells the system
what file to launch. And the `scripts` object has scripts that you can
launch with `$ ``npm` `run SCRIPT_NAME`. The `start` script and test are
exceptions. You can run them with `$ ``npm`` start` and
`$ ``npm`` test`.

To update a package to its current latest version or the latest version
that is allowable by the version specification defined in
`package.json`, use:

    $ npm update name-of-the-package

Or for single module installation:

    $ npm install name-of-the-package

The only module used in this book's examples—and which does not belong
to the core Node.js package—is `mongodb`. We'll install it later in the
book.

Heroku will need `package.json` to run NPM on the server.

For more information on NPM, take a look at the article "[Tour of
NPM](http://tobyho.com/2012/02/09/tour-of-npm/)"
(http://tobyho.com/2012/02/09/tour-of-npm)

Deploying "Hello World" to PaaS
===============================

For Heroku and Windows Azure deployment, we'll need a Git repository. To
create it from the root of your project, type the following command in
your terminal:

    $ git init

Git will create a hidden `.``git` folder. Now we can add files and make
the first commit:

    $ git add .
    $ git commit -am "first commit"

Tip: To view hidden files on the Mac OS X Finder app, execute this
command in a terminal window:
`defaults write ``com.apple.finder`` ``AppleShowAllFiles`` -``bool`` true`.
To change the flag back to hidden:
`defaults write ``com.apple.finder`` ``AppleShowAllFiles`` -``bool`` false`.

Deploying to Windows Azure
==========================

In order to deploy our "Hello World" application to Windows Azure, we
must add Git **remote**. You could copy the URL from Windows Azure
Portal, under Web Site, and use it with this command:

    $ git remote add azure yourURL

Now we should be able to make a push with this command:

    $ git push azure master

If everything went okay, you should see success logs in the terminal and
"Hello World" in the browser of your Windows Azure Web Site URL.

To push changes, just execute:

    $ git add .
    $ git commit -m "changing to hello azure"
    $ git push azure master

A more meticulous guide can be found in the tutorial
https://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-develop-deploy-mac.

Deploying to Heroku
===================

For Heroku deployment, we need to create two extra files: `Procfile` and
`package.json`. You could get the source code from
https://github.com/azat-co/fullstack-javascript/tree/master/07-hello or
write your own one.

The structure of the "Hello World" application looks like this:

    /07-hello
      -package.json
      -Procfile
      -server.js

Procfile is a mechanism for declaring what commands are run by your
application’s dynos on the Heroku platform. Basically, it tells Heroku
what processes to run. Procfile has only one line in this case:

    web: node server.js

For this example, we keep `package.json` simple:

    {
      "name": "node-example",
      "version": "0.0.1",
      "dependencies": {
      },
      "engines": {
        "node": ">=0.6.x"
      }
    }

After we have all of the files in the project folder, we can use Git to
deploy the application. The commands are pretty much the same as with
Windows Azure except that we need to add Git remote, and create Cedar
stack with:

    $ heroku create

After it's done, we push and update with:

    $ git push heroku master
    $ git add .
    $ git commit -am "changes :+1:"
    $ git push heroku master

If everything went okay, you should see success logs in the terminal and
"Hello World" in the browser of your Heroku app URL.

Message Board with Node.js: Memory Store Version
------------------------------------------------

Supplemental video which walks you through the implementation and
demonstrates the project: http://bit.ly/1QnqO9P.

The first version of the Message Board back-end application will store
messages only in runtime memory storage for the sake of KISS
(http://en.wikipedia.org/wiki/KISS_principle). That means that each
time we start/reset the server, the data will be lost.

We'll start with a simple test case first to illustrate the Test-Driven
Development approach. The full code is available at
https://github.com/azat-co/fullstack-javascript/tree/master/08-test.

Unit Testing Node.js
--------------------

We should have two methods:

1.  Get all of the messages as an array of JSON objects for the GET
    `/message` endpoint using the `getMessages()` method

2.  Add a new message with properties `name` and `message` for POST
    `/messages` route via the `addMessage()` function

We'll start by creating an empty `mb-server.js` file. After it's there,
let's switch to tests and create the `test.js` file with the following
content:

    var http = require('http')
    var assert = require('assert')
    var querystring = require('querystring')
    var util = require('util')

    var messageBoard = require('./mb-server')

    assert.deepEqual('[{"name":"John","message":"hi"}]',
      messageBoard.getMessages())
    assert.deepEqual ('{"name":"Jake","message":"gogo"}',
      messageBoard.addMessage ("name=Jake&message=gogo"))
    assert.deepEqual('[{"name":"John","message":"hi"},{"name":"Jake","message":"gogo"}]',
      messageBoard.getMessages())

Please keep in mind that this is a very simplified comparison of strings
and not JavaScript objects. So every space, quote, and case matters. You
could make the comparison "smarter" by parsing a string into a JSON
object with:

    JSON.parse(str)

For testing our assumptions, we use core the Node.js module
[assert](http://nodejs.org/api/assert.html). It provides a bunch of
useful methods like `equal()`, `deepEqual()`, etc.

More advanced libraries include alternative interfaces with TDD and/or
BDD approaches:

-   [Expect](https://github.com/LearnBoost/expect.js): Minimalistic
    BDD-style assertion library:, for example,
    `expect(user.name).to.eql('azat')`

-   [Should](https://github.com/shouldjs/should.js)
    (<https://github.com/shouldjs/should.js>): BDD-style assertion library
    that works by modifying `Object.prototype`: for example,
    `user.name.should.be.eql``('azat')`

For more Test-Driven Development and cutting-edge automated testing, you
could use the following libraries and modules:

-   [Mocha](https://mochajs.org) (<https://mochajs.org>): Feature-rich
    testing framework (my default choice)

-   [NodeUnit](https://github.com/caolan/nodeunit)
    (<https://github.com/caolan/nodeunit>): Simple assert-style unit
    testing library

-   [Jasmine](https://github.com/jasmine/jasmine)
    (<https://github.com/jasmine/jasmine>): BDD testing framework with
    built-in assertion and spy (for mocking) libraries

-   [Vows](http://vowsjs.org) (<http://vowsjs.org>): BDD framework for
    Node.js tailored to testing asynchronous code

-   [Chai](http://chaijs.com) (<http://chaijs.com>): BDD/TDD assertion
    library that can be paired with a testing framework and has its own
    versions of Should, Expect, and Assert

-   [Tape](https://github.com/substack/tape)
    (<https://github.com/substack/tape>): A minimalistic TAP (Test
    Anything Protocol) library

-   [Jest](https://facebook.github.io/jest)
    (<http://facebook.github.io/jest>): Jasmine-and-Expect-like testing
    library with automatic mocks

You could copy the "Hello World" script into the `mb-server.js` file for
now or even keep it empty. If we run `test.js` by the terminal command:

    $ node test.js

We should see an error. Probably something like this one:

    TypeError: Object #<Object> has no method 'getMessages'

That's totally fine, because we haven't written `getMessages()`
method yet. So let's do it and make our application more useful by
adding two new methods: to get the list of the messages for Chat and to
add a new message to the collection.

`mb-server.js` file with global `exports` object:

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

We import dependencies:

    var http = require('http')
    // Loads http module
    var util= require('util')
    // Usefull functions
    var querystring = require('querystring')
    // Loads querystring module, we'll need it to serialize and deserialize objects and query strings

And set the port. If it's set in the env var, we use that value; and if
it's not set, we use a hard-coded value of 1337:

    var port = process.env.PORT || 1337

So far, nothing fancy, right? To store the list of messages, we'll use
an array:

    var messages=[]
    // This array will hold our messages
    messages.push({
      'name': 'John',
      'message': 'hi'
    })
    // Sample message to test list method

Generally, fixtures like dummy data belong to the test/spec files and
not to the main application code base.

Our server code will look slightly more interesting. For getting the
list of messages, according to REST methodology, we need to make a GET
request. For creating/adding a new message, it should be a POST request.
So in our createServer object, we should add `req.method()` and
`req.url()` to check for an HTTP request type and a URL path.

Let's load the http module:

    var http = require('http')

We'll need some of the handy functions from the `util` and `querystring`
modules (to serialize and deserialize objects and query strings):

    var util= require('util')
    // Usefull functions
    var querystring = require('querystring')
    // Loads querystring module, we'll need it to serialize and deserialize objects and query strings

To create a server and expose it to outside modules (i.e., `test.js`):

    exports.server=http.createServer(function (req, res) {
    // Creates server

Inside of the request handler callback, we should check if the request
method is POST and the URL is `messages/create.json`:

      if (req.method == 'POST' && req.url == '/messages/create.json') {
        // If method is POST and URL is messages/ add message to the array

If the condition above is true, we add a message to the array. However,
`data` must be converted to a string type (with encoding UTF-8) prior to
the adding, because it is a type of Buffer:

        var message = ''
        req.on('data', function(data, msg){
          console.log(data.toString('utf-8'))
          message=exports.addMessage(data.toString('utf-8'))
          // Data is type of Buffer and must be converted to string with encoding UTF-8 first
          // Adds message to the array
        })

These logs will help us to monitor the server activity in the terminal:

        req.on('end', function(){
          console.log('message', util.inspect(message, true, null))
          console.log('messages:', util.inspect(messages, true, null))
          // Debugging output into the terminal

The output should be in a text format with a status of 200 (okay):

          res.writeHead(200, {'Content-Type': 'text/plain'})
          // Sets the right header and status code

We output a message with a newly created object ID:

          res.end(message)
          // Out put message, should add object id
        })      

If the method is GET and the URL is `/messages/list.json` output a
list of messages:

      } else
      if (req.method == 'GET' && req.url == '/messages/list.json') {
      // If method is GET and URL is /messages output list of messages

Fetch a list of messages:

        var body = exports.getMessages()
        // Body will hold our output

The response body will hold our output:

        res.writeHead(200, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        })
        res.end(body)

The next `else` is for when there's not matches for any of the previous
conditions. This sets the right header and status code:

      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        // Sets the right header and status code

In case it's neither of the two endpoints above, we output a string with
a line end symbol:

        res.end('Hello World\n')
        // Outputs string with line end symbol
      }

Start the server:

    }).listen(port)
    // Sets port and IP address of the server

Now, we should set a port and IP address of the server:

    console.log('Server running at http://127.0.0.1:%s/', port)

We expose methods for the unit testing in `test.js` (exports keyword),
and this function returns an array of messages as a string/text:

    exports.getMessages = function() {
      return JSON.stringify(messages)
    }

`addMessage()` converts a string into a JavaScript object with the
parse/deserializer method from querystring:

    exports.addMessage = function (data){
      messages.push(querystring.parse(data))

Also returning a new message in a JSON-as-a-string format:

      return JSON.stringify(querystring.parse(data))
    }

Here is the full code of `mb-server.js` minus the comments. It's
also available at
[08-test](https://github.com/azat-co/fullstack-javascript/tree/master/08-test):

    var http = require('http')
    // Loads http module
    var util= require('util')
    // Usefull functions
    var querystring = require('querystring')
    // Loads querystring module, we'll need it to serialize and deserialize objects and query strings

    var port = process.env.PORT || 1337

    var messages=[]
    // This array will hold our messages
    messages.push({
      'name': 'John',
      'message': 'hi'
    })
    // Sample message to test list method

    exports.server=http.createServer(function (req, res) {
    // Creates server
      if (req.method == 'POST' && req.url == '/messages/create.json') {
        // If method is POST and URL is messages/ add message to the array
        var message = ''
        req.on('data', function(data, msg){
          console.log(data.toString('utf-8'))
          message=exports.addMessage(data.toString('utf-8'))
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
      } else
      if (req.method == 'GET' && req.url == '/messages/list.json') {
      // If method is GET and URL is /messages output list of messages
        var body = exports.getMessages()
        // Body will hold our output
        res.writeHead(200, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        })
        res.end(body)
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        // Sets the right header and status code
        res.end('Hello World\n')
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

To check it, go to
[localhost:1337/messages/list.json](http://localhost:1337/messages/list.json).
You should see an example message.

Alternatively, you could use the terminal command to fetch the messages:

    $ curl http://127.0.0.1:1337/messages/list.json

To make the POST request by using a command-line interface:

    $ curl -d "name=BOB&message=test" http://127.0.0.1:1337/messages/create.json

And you should get the output in a server terminal window and a new
message "test" when you refresh
[localhost:1337/messages/list.json](http://localhost:1337/messages/list.json).
Needless to say, all three tests should pass.

Your application might grow bigger with more methods, URL paths to parse
and conditions. That is where frameworks come in handy. They provide
helpers to process requests and other nice things like static file
support, sessions, etc. In this example, we intentionally didn't use any
frameworks like Express (<http://expressjs.com>) or Restify
(<http://mcavage.github.com/node-restify>). Other notable Node.js
frameworks:

-   [Derby](http://derbyjs.com) (<http://derbyjs.com>):MVC framework
    making it easy to write real-time, collaborative applications that
    run in both Node.js and browsers

-   [Express.js](http://expressjs.com)
    (<http://expressjs.com/en/index.html>): the most robust, tested and
    used Node.js framework

-   [Restify](http://mcavage.github.com/node-restify)
    (<http://restify.com>): lightweight framework for REST API servers

-   [Sails.js](http://sailsjs.org) (<http://sailsjs.org>): MVC Node.js
    framework

-   [hapi](http://spumko.github.io) (<http://spumko.github.io>): Node.js
    framework built on top of Express.js

-   [Connect](http://www.senchalabs.org/connect)
    (<https://github.com/senchalabs/connect#readme>): a middleware
    framework for node, shipping with over 18 bundled middlewares and a
    rich selection of third-party middleware

-   [GeddyJS](http://geddyjs.org) (<http://geddyjs.org>): a simple,
    structured MVC web framework for Node

-   [CompoundJS](http://compoundjs.com) (<http://compoundjs.com>)
    (ex-RailswayJS): Node.JS MVC framework based on ExpressJS

-   [Tower.js](http://towerjs.org) (<http://tower.github.io>): a full
    stack web framework for Node.js and the browser

-   [Meteor](http://meteor.com) (<https://www.meteor.com>): open-source
    platform for building top-quality web apps in a fraction of the time

For a list of hand-picked frameworks, take a look at
(<http://nodeframeworks.com>). Ways to improve the application:

-   Improve existing test cases by adding object comparison instead of a
    string one

-   Move the seed data to `test.js` from `mb-server.js`

-   Add test cases to support your front-end (e.g., up-vote, user
    log in)

-   Add methods to support your front-end (e.g., up-vote, user log in)

-   Generate unique IDs for each message and store them in a Hash
    instead of an Array

-   Install Mocha and re-factor test.js so it uses this library

So far we've been storing our messages in the application memory, so
each time the application is restarted, we lose it. To fix it, we need
to add a persistence, and one of the ways is to use a database like
MongoDB.

Summary
-------

In this chapter we've covered important topics that will lay the
foundation. They exhibit the "Hello World" application in Node.js, list
of some of its most important core modules, NPM workflow, detailed
commands for deployment of Node.js apps to Heroku and Windows Azure; and
an example of a test-driven development practice.
