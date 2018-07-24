<span id="intro-to-node.js" class="anchor"></span>

CHAPTER 6
---------

Intro to Node.js
================

> *Any fool can write code that a computer can understand. Good programmers write code that humans can understand.*
>
> — [Martin Fowler](http://en.wikipedia.org/wiki/Martin_Fowler)

In this chapter, we'll cover the following:

-   Building "Hello World" in Node.js
-   Node.js core modules
-   npm Node.js package manager
-   Message Board with Node.js: memory store version
-   Unit testing Node.js

Node.js is a non-blocking platform for building web applications. It uses JavaScript, so it's a centerpiece in our full stack JavaScript development. We'll start by building our "Hello World" app and then we'll cover core modules and npm. Then, we deploy our "Hello World" app to the cloud.

Building "Hello World" in Node.js
=================================

To check if you have Node.js installed on your computer, type and execute this command in your terminal:

    $ node -v

Get the version 8 or higher. If you don't have Node.js installed, or if your version is older (behind or lower), you can download the latest version at <http://nodejs.org/#download>. You can use one of these tools for version management (i.e., switching between Node.js versions):

-   `n`: <https://npmjs.com/n>
-   `nave`: <https://npmjs.com/nave>
-   `nvm`: <https://npmjs.com/nvm>
-   `nvm-windows`: <https://github.com/coreybutler/nvm-windows>

As usual, you could copy the example code at <http://bit.ly/2Lbvxzr>, or write your own program from scratch. If you wish to do the latter, create a folder `hello` for your "Hello World" Node.js application. Then create a file `server.js` and line by line type the code below.

This line will load the core `http` module for the server (more on the modules later):

    const http = require('http')

We'll need a port number for our Node.js server. To get it from the environment or assign 1337 if the environment is not set, use:

    const port = process.env.PORT || 1337

This will create a server, and a callback function will contain the response handler code:

    const server = http.createServer((req, res) => {

To set the right header and status code, use:

      res.writeHead(200, {'Content-Type': 'text/plain'})

To output "Hello World" with the line end symbol, use:

      res.end('Hello World\n')
    })

To set a port and display the address of the server and the port number, use:

    server.listen(port, () => {
      console.log('Server is running at %s:%s ',
        server.address().address, server.address().port)
    })

From the folder in which you have `server.js`, launch in your terminal the following command:

    $ node server.js

Open <http://localhost:1337> or <http://127.0.0.1:1337> or any other address you see in the terminal as a result of the `console.log()` function, and you should see "Hello World" in a browser. To shut down the server, press Control + C.

**Note** The name of the main file could be different from `server.js` (e.g., `index.js` or `app.js`). In case you need to launch the `app.js` file, just use `$ node app.js`.

Node.js Core Modules
====================

Unlike other programming technologies, Node.js doesn't come with a heavy standard library. The core modules of Node.js are a bare minimum and the
rest can be cherry-picked via the npm Node.js package manager registry. The main core modules, classes, methods, and events include:

-   [http](http://nodejs.org/api/http.html) (<https://nodejs.org/api/http.html>): Module for working with HTTP protocol

-   [util](http://nodejs.org/api/util.html) (<https://nodejs.org/api/util.html>): Module with various helpers

-   [querystring](http://nodejs.org/api/querystring.html) (<https://nodejs.org/api/querystring.html>): Module for parsing query strings from the URI

-   [url](http://nodejs.org/api/url.html) (<https://nodejs.org/api/url.html>): Module for parsing URI information

-   [fs](http://nodejs.org/api/fs.html) (<https://nodejs.org/api/fs.html>): Module for working with the file system

These are the most important core modules. Let's take a look at each of them.

### http

This is the main module responsible for the Node.js HTTP server. Here are the main methods:

-   `http.createServer()`: Returns a new web server object
-   `http.listen()`: Begins accepting connections on the specified port and hostname
-   `http.ServerRequest()`: Passes incoming requests to request handlers
    -   `data`: Emitted when a piece of the message body is received
    -   `end`: Emitted exactly once for each request
    -   `request.method()`: The request method as a string
    -   `request.url()`: Request URL string

-   `http.ServerResponse()`: Provides response/output of request handlers initiated by an HTTP server—not by the user

    -   `response.writeHead()`: Sends a response header to the request
    -   `response.write()`: Sends a response body
    -   `response.end()`: Sends and ends a response body

### util

This module provides a utility for debugging:

-   `util.inspect()`: Returns a string representation of an object,
    which is useful for debugging

### querystring

This module provides utilities for dealing with query strings. Some of the methods include:

-   `querystring.stringify()`: Serializes an object to a query string
-   `querystring.parse()`: Deserializes a query string to an object

### url

This module has a utility for URL resolution and parsing:

-   `url.parse()`: Takes a URL string, and returns an object which has URL information broken down into parts

### fs

`fs` handles file system operations such as reading and writing to/from files. There are synchronous and asynchronous methods in the library. Some of the methods include:

-   `fs.readFile()`: Reads file asynchronously
-   `fs.writeFile()`: Writes data to file asynchronously

There is no need to install or download core modules. To include them in your application, all you need is to follow the syntax:

    const http = require('http')

The lists of non-core modules can be found at:

-   [npmjs.org](https://npmjs.org): Node.js Package Manager registry
-   Nipster (<http://eirikb.github.io/nipster>): npm search tool for Node.js
-   node-modules (<http://node-modules.com>): npm search engine

If you would like to know how to code your own modules, take a look at Chapter 12 "Modularizing Your Code and Publishing Node.js Modules to npm" of Practical Node.js, 2nd Edition: <http://bit.ly/2LkG0Zk>.

npm Node.js Package Manager
------------------------

Node.js Package Manager, or npm, manages dependencies and installs modules for you. Node.js installation comes with npm, whose web site is [npmjs.org](http://npmjs.org).

`package.json` contains meta information about our Node.js application such as a version number; author name; and, most important, what dependencies we use in the application. All of that information is in the JSON formatted object, which is read by npm.

If you would like to install packages and dependencies specified in `package.json`, type:

    $ npm install

A typical `package.json` file might look like this:

```js
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
```

While most of the properties in the `package.json` example above like `description` and `name` are self-explanatory, others deserve more explaining. The `dependencies` property is an object, and each item has the name on the left side and the version number on the right side. For example, this statement tells npm to use Express.js version 2.5.6 or lower (earlier):

```js
"express": "<= 2.5.6"
```

The version can be exact (recommended). For example, this statement locks the version of Express.js at 2.5.6.:

```js
"express": "2.5.6,"
```

The versions can be specified to be greater-than (`>`), less-than (`<`), or any/wildcard (`*`). For example, this statement tell npm to use any version which usually means npm will get the latest stable version:

```js
"express": "*"
```

A wild card is a great way to blow up your app in production with new untested dependencies: therefore not recommended.

The `bin` property is for command-line utilities. It tells the system what file to launch. And the `scripts` object has scripts that you can launch with `$ npm run SCRIPT_NAME`. The `start` and `test` scripts are exceptions. You can run them with `$ npm start` and `$ npm test`.

To update a package to its current latest version or the latest version that is allowable by the version specification defined in
`package.json`, use:

    $ npm update name-of-the-package

Or for single module installation:

    $ npm install name-of-the-package

The only module used in this book's examples—and which does not belong to the core Node.js package—is `mongodb`. We'll install it in the next chapter.

However, Heroku will need `package.json` to run npm on the server. The easiest way to create `package.json` is to execute:

```
$ npm init -y
```


Deploying "Hello World" to PaaS
===============================

For Heroku and Microsoft Azure deployment, we'll need a Git repository. To create it from the root of your project, type the following command in your terminal:

    $ git init

Git will create a hidden `.git` folder. Now we can add files and make the first commit:

    $ git add .
    $ git commit -am "first commit"

**Tip** To view hidden files on the macOS Finder app, execute this command in a terminal window:

```
defaults write com.apple.finder AppleShowAllFiles -bool true
```

To change the flag back to hidden:

```
defaults write com.apple.finder AppleShowAllFiles -bool false
```

Deploying to Microsoft Azure
==========================

In order to deploy our "Hello World" application to Microsoft Azure, we must add a Git remote destination that belongs to Azure. You could copy the URI/URL from the Microsoft Azure Portal, and use it with this command:

```
$ git remote add azure YOUR_AZURE_URI
```

Now we should be able to make a push with this command:

```
$ git push azure master
```

If everything went okay, you should see success logs in the terminal and "Hello World" in the browser of your Microsoft Azure Web Site URL.

To push changes, just execute:

```
$ git add .
$ git commit -m "changing to hello azure"
$ git push azure master
```

A more meticulous guide can be found in the tutorial <http://bit.ly/2LbXQOi>.

Deploying to Heroku
===================

For Heroku deployment, we need to create two extra files: `Procfile` and `package.json`. You could get the source code from <http://bit.ly/2Lbvxzr> or write your own one.

The structure of the "Hello World" application looks like this:

```
/06-hello
  -package.json
  -Procfile
  -server.js
```

`Procfile` is a mechanism for declaring what commands are run by your application’s dynos on the Heroku platform. Basically, it tells Heroku what processes to run. `Procfile` has only one line in this case:

    web: node server.js

For this example, we keep `package.json` simple:

```js
{
  "name": "node-example",
  "version": "0.0.1",
  "dependencies": {
  },
  "engines": {
    "node": ">=0.6.x"
  }
}
```

After we have all of the files in the project folder, we can use Git to deploy the application. The commands are pretty much the same as with Microsoft Azure except that we need to add Git remote, and create Cedar
Stack with:

    $ heroku create

After it's done, we push and update with:

    $ git push heroku master
    $ git add .
    $ git commit -am "changes :+1:"
    $ git push heroku master

If everything went okay, you should see success logs in the terminal and "Hello World" in the browser of your Heroku app URL.

Message Board with Node.js: Memory Store Version
------------------------------------------------

The first version of the Message Board back-end application will store messages only in runtime memory storage for the sake of the KISS principle—keep it simple stupid (<http://azat.co/blog/kiss>). That means that each
time we start/reset the server, the data will be lost.

We'll start with a simple test case first to illustrate the Test-Driven Development approach. The full code is available at the book's GitHub repository in the `code/06-test` folder: <http://bit.ly/2LcnHWv>.

Unit Testing Node.js
--------------------

We should have two methods:

1.  Get all of the messages as an array of JSON objects for the GET `/message` endpoint using the `getMessages()` method

2.  Add a new message with properties `name` and `message` for the POST `/messages` route via the `addMessage()` function

We'll start by creating an empty `mb-server.js` file. After it's there, let's switch to tests and create the `test.js` file with the following content:

```js
const http = require('http')
const assert = require('assert')
const querystring = require('querystring')
const util = require('util')

const messageBoard = require('./mb-server')

assert.deepEqual('[{"name":"John","message":"hi"}]',
  messageBoard.getMessages())
assert.deepEqual ('{"name":"Jake","message":"gogo"}',
  messageBoard.addMessage ("name=Jake&message=gogo"))
assert.deepEqual('[{"name":"John","message":"hi"},{"name":"Jake","message":"gogo"}]',
  messageBoard.getMessages())
```

Please keep in mind that this is a very simplified comparison of strings and not JavaScript objects. So every space, quote, and case matters. You could make the comparison "smarter" by parsing a string into a JSON object with:

    JSON.parse(str)

For testing our assumptions, we use the core Node.js module [assert](http://nodejs.org/api/assert.html). It provides a bunch of useful methods like `equal()`, `deepEqual()`, etc.

More advanced libraries include alternative interfaces with TDD and/or BDD approaches:

-   `expect.js` (<https://www.npmjs.com/expect.js>): Minimalistic BDD-style assertion library: for example, `expect(user.name).to.eql('azat')`
-   `should` (<https://www.npmjs.com/should> and <http://shouldjs.github.io>): BDD-style assertion library that works by modifying `Object.prototype`: for example, `user.name.should.be.eql('azat')`

For more Test-Driven Development and cutting-edge automated testing, you could use the following libraries and modules:

-   `mocha` (<https://www.npmjs.com/mocha> and <https://mochajs.org>): Feature-rich testing framework (my default choice)
-   `jasmine` (<https://www.npmjs.com/jasmine> <https://jasmine.github.io>): BDD testing framework with built-in assertion and spy (for mocking) libraries
-   `vows` (<https://www.npmjs.com/vows> and <http://vowsjs.org>): BDD framework for Node.js tailored to testing asynchronous code
-   `chai` (<https://www.npmjs.com/chaijs> and <http://chaijs.com>): BDD/TDD assertion library that can be paired with a testing framework and has its own versions of Should, Expect, and Assert
-   `tape` (<https://www.npmjs.com/tape>): A minimalistic TAP (Test Anything Protocol) library
-   `jest` (<https://www.npmjs.com/jest> and <https://jestjs.io>): Jasmine-and-Expect-like testing library with automatic mocks

You could copy the "Hello World" script into the `mb-server.js` file for now or even keep it empty. If we run `test.js` by the terminal command:

    $ node test.js

we should see an error, probably something like this one:

    TypeError: Object #<Object> has no method 'getMessages'

That's totally fine, because we haven't written the `getMessages()` method yet. So let's do it and make our application more useful by adding two new methods: to get the list of the messages for Chat and to
add a new message to the collection.

Here's the `mb-server.js` file with the global `exports` object:

```js
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
```

We import dependencies:

```js
const http = require('http')
// Loads http module
const util= require('util')
// Usefull functions
const querystring = require('querystring')
// Loads querystring module, we'll need it to serialize and deserialize objects and query strings
```

And set the port. If it's set in the environment variable `PORT` (e.g., `$ PORT=3000 node server.js`), we use that value; and if it's not set, we use a hard-coded value of 1337:

    const port = process.env.PORT || 1337

So far, nothing fancy, right? To store the list of messages, we'll use an array:

```js
const messages=[]
// This array will hold our messages
messages.push({
    'name': 'John',
    'message': 'hi'
})
// Sample message to test list method
```

Generally, fixtures like dummy data belong to the test/spec files and not to the main application code base.

Our server code will look slightly more interesting. For getting the list of messages, according to REST methodology, we need to make a GET request. For creating/adding a new message, it should be a POST request. So in our `createServer` object, we should add `req.method()` and
`req.url()` to check for an HTTP request type and a URL path.

Let's load the `http` module:

    const http = require('http')

We'll need some of the handy functions from the `util` and `querystring` modules (to serialize and deserialize objects and query strings):

```js
const util= require('util')
// Usefull functions
const querystring = require('querystring')
// Loads querystring module, we'll need it to serialize and deserialize objects and query strings
```

To create a server and expose it to outside modules (i.e., `test.js`):

```js
exports.server=http.createServer(function (req, res) {
// Creates server
```

Inside of the request handler callback, we should check if the request method is POST and the URL is `messages/create.json`:

      if (req.method == 'POST' && req.url == '/messages/create.json') {
        // If method is POST and URL is messages/ add message to the array

If the condition above is true, we add a message to the array. However, `data` must be converted to a string type (with encoding UTF-8) prior to the adding, because it is a type of `Buffer`:

```js
let message = ''
req.on('data', function(data, msg) {
    console.log(data.toString('utf-8'))
    message=exports.addMessage(data.toString('utf-8'))
    // Data is type of Buffer and must be converted to string with encoding UTF-8 first
    // Adds message to the array
})
```

These logs will help us to monitor the server activity in the terminal:

```js
    req.on('end', function() {
      console.log('message', util.inspect(message, true, null))
      console.log('messages:', util.inspect(messages, true, null))
      // Debugging output into the terminal
```

The output should be in a text format with a status of 200 (okay):

```js
      res.writeHead(200, {'Content-Type': 'text/plain'})
      // Sets the right header and status code
```

We output a message with a newly created object ID:

```js
      res.end(message)
      // Out put message, should add object id
    })
```

If the method is GET and the URL is `/messages/list.json`, output a list of messages:

```js
  } else if (req.method == 'GET' && req.url == '/messages/list.json') {
  // If method is GET and URL is /messages output list of messages
```

Fetch a list of messages:

```js
    const body = exports.getMessages()
    // Body will hold our output
```

The response body will hold our output:

```js
    res.writeHead(200, {
      'Content-Length': body.length,
      'Content-Type': 'text/plain'
    })
    res.end(body)
```

The next `else` is for when there's not a match for any of the previous conditions. This sets the right header and status code:

```js
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    // Sets the right header and status code
```

In case it's neither of the two endpoints above, we output a string with a line end symbol:

```js
    res.end('Hello World\n')
    // Outputs string with line end symbol
  }
```

Start the server:

```js
}).listen(port)
// Sets port and IP address of the server
```

Now, we should set a port and IP address of the server:

```js
console.log('Server running at http://127.0.0.1:%s/', port)
```

We expose methods for the unit testing in `test.js` (`exports` keyword), and this function returns an array of messages as a string/text:

```js
exports.getMessages = function() {
  return JSON.stringify(messages)
}
```

`addMessage()` converts a string into a JavaScript object with the `parse()` deserializer method from `querystring`:

```js
exports.addMessage = function (data) {
  messages.push(querystring.parse(data))
```

We also return a new message in a JSON-as-a-string format:

```js
  return JSON.stringify(querystring.parse(data))
}
```

Here is the full code of `mb-server.js` minus the comments. It's also available in the [code/06-test](https://github.com/azat-co/fullstack-javascript/tree/master/code/06-test) folder.

```js
const http = require('http')
// Loads http module
const util= require('util')
// Usefull functions
const querystring = require('querystring')
// Loads querystring module, we'll need it to serialize and deserialize objects and query strings

const port = process.env.PORT || 1337

const messages=[]
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
    let message = ''
    req.on('data', function(data, msg) {
      console.log(data.toString('utf-8'))
      message=exports.addMessage(data.toString('utf-8'))
      // Data is type of Buffer and must be converted to string with encoding UTF-8 first
      // Adds message to the array
    })
    req.on('end', function() {
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
    const body = exports.getMessages()
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
exports.addMessage = function (data) {
  messages.push(querystring.parse(data))
  // To convert string into JavaScript object we use parse/deserializer
  return JSON.stringify(querystring.parse(data))
  // Output new message in JSON as a string
}
```

To check it, go to <http://localhost:1337/messages/list.json>. You should see an example message. Alternatively, you could use the terminal command to fetch the messages:

    $ curl http://127.0.0.1:1337/messages/list.json

To make the POST request by using a command-line interface:

    $ curl -d "name=BOB&message=test" http://127.0.0.1:1337/messages/create.json

And you should get the output in a server terminal window and a new message "test" when you refresh <http://localhost:1337/messages/list.json>. Needless to say, all three tests should pass.

Your application might grow bigger with more methods, URL paths to parse, and conditions. That is where frameworks come in handy. They provide helpers to process requests and other nice things like static file support, sessions, etc. In this example, we intentionally didn't use any frameworks like Express.js or Restify but there are many powerful and useful frameworks for Node. Here's the list of the most popular and notable Node.js frameworks:

-   [Derby](http://derbyjs.com) (<http://derbyjs.com>): MVC framework makes it easy to write real-time, collaborative applications that run in both Node.js and browsers
-   [Express.js](http://expressjs.com) (<http://expressjs.com>): The most robust, tested and used Node.js framework
-   [Restify](http://mcavage.github.com/node-restify) (<http://restify.com>): Lightweight framework for REST API servers
-   [Sails](http://sailsjs.org) (<http://sailsjs.org>): MVC Node.js framework with rich scaffolding
-   [hapi](https://hapijs.com) (<https://hapijs.com>): Node.js framework built on top of Express.js
-   [Connect](http://www.senchalabs.org/connect) (<https://github.com/senchalabs/connect>): Middleware framework for Node.js, shipping with over 18 bundled middlewares and a rich selection of third-party middleware
-   [GeddyJS](http://geddyjs.org) (<http://geddyjs.org>): Simple, structured MVC web framework for Node
-   [CompoundJS](http://compoundjs.com) (<http://compoundjs.com>) (ex-RailswayJS): Node.js MVC framework based on Express.js
-   [Tower.js](http://towerjs.org) (<http://tower.github.io>): Full stack web framework for Node.js and the browser
-   [Meteor](http://meteor.com) (<https://www.meteor.com>): Open-source platform for building top-quality web apps in a fraction of the time

For a list of hand-picked Node.js frameworks, take a look at <http://nodeframeworks.com>.

Next, I will explain a few ways to improve the REST API application. These are your assignments to give you more practice and make the learning more effective:

-   Improve existing test cases by adding object comparison instead of a string one
-   Move the seed data to `test.js` from `mb-server.js`
-   Add test cases to support your frontend (e.g., up vote, user login)
-   Add methods to support your frontend (e.g., up-vote, user login)
-   Generate unique IDs for each message and store them in a Hash instead of an Array
-   Install Mocha and re-factor `test.js` so it uses this library

So far we've been storing our messages in the application memory, so each time the application is restarted, we lose our messages. To fix it, we need to add persistence (more permanent store), and one of the best ways is to use a database like MongoDB, introduced in the next chapter.

Summary
-------

In this chapter we've covered important topics that will lay the foundation for all of your future Node.js development. This chapter taught the "Hello World" application in Node.js, listed of some of its most important Node.js core modules, explained the npm workflow, covered test-driven development practice, and provided detailed commands for deployment of Node.js apps to the Heroku and Microsoft Azure cloud services.
