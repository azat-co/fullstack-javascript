<span id="putting-it-all-together" class="anchor"></span>

CHAPTER 8
---------

Putting It All Together
=======================

> *Debugging is twice as hard as writing the code in the first place.
> Therefore, if you write the code as cleverly as possible, you are, by
> definition, not smart enough to debug it.*
>
> — [Brian W. Kernighan](http://en.wikipedia.org/wiki/Brian_Kernighan)

In this chapter, we'll cover:

-   Adding CORS for Different Domain Deployment

-   Message Board UI

-   Message Board API

-   Deployment to Heroku

-   Same Domain Deployment Server

-   Deployment to Amazon Web Services

Now, it would be good if we could put our front-end and back-end
applications so they could work together. There are a few ways to do it:

-   Different domains (Heroku apps) for front-end and back-end apps:
    make sure there are no cross-domain issues by using CORS or JSONP.
    This approach is covered in detail later.

-   Same domain deployment: make sure Node.js process static resources
    and assets for front-end application—not recommended for serious
    production applications.

Adding CORS for Different Domain Deployment
===========================================

This is, so far, the best practice for the production environment.
Back-end applications are usually deployed at the `http://app.` or
`http://api.` subdomains.

One way to make a different domain deployment work is to overcome the
same-domain limitation of AJAX technology with JSONP:

    const request = $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {...},
      jsonpCallback: 'fetchData,
      type: 'GET'
    })

The other, and better, way to do it is to add the OPTIONS method, and
special headers, which are called [cross-origin resource
sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) or
CORS (<https://en.wikipedia.org/wiki/Cross-origin_resource_sharing>), to
the Node.js server app before the output:

      ...
      response.writeHead(200,{
        'Access-Control-Allow-Origin': origin,
        'Content-Type':'text/plain',
        'Content-Length':body.length
      })
      ...

or

      ...
      res.writeHead(200, {
        'Access-Control-Allow-Origin', 'your-domain-name',
        ...
      })
      ...

The need for the OPTIONS method is outlined in [HTTP access control
(https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)](https://developer.mozilla.org/en-US/docs/HTTP_access_control).
The OPTIONS request can be dealt with in the following manner:

      ...
      if (request.method=="OPTIONS") {
        response.writeHead("204", "No Content", {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "content-type, accept",
          "Access-Control-Max-Age": 10, // Seconds.
          "Content-Length": 0
        })
        response.end();
      }
      ...

Message Board UI
================

<span id="OLE_LINK26" class="anchor"><span id="OLE_LINK27"
class="anchor"><span id="OLE_LINK36" class="anchor"><span
id="OLE_LINK57" class="anchor"><span id="OLE_LINK58"
class="anchor"><span id="UI"
class="anchor"></span></span></span></span></span></span>Supplemental
video which walks you through the implementation and demonstrates the
project: http://bit.ly/1QnsvEb.

Our front-end application used Parse.com as a replacement for a back-end
application. Now we can switch to our own back end replacing the
endpoints along with a few other painless changes. Let me walk you
through them.

In the beginning of the `app.js` file, uncomment the first line for
running locally, or replace the URL values with your Heroku or Windows
Azure back-end application public URLs:

    // const URL = 'http://localhost:1337/'
    const URL ='http://your-app-name.herokuapp.com/'

Most of the code in `app.js` and the folder structure remained intact
from the `06-board-backbone-parse-sdk` project, with the exception of
replacing Parse.com models and collections with original Backbone.js
ones. So go ahead and type or copy the RequireJS block for loading of
the dependencies (templates in this case):

    require([
        'libs/text!header.html',
        'libs/text!home.html',
        'libs/text!footer.html'],
        function (
            headerTpl,
            homeTpl,
            footerTpl) {

The `ApplicationRouter`, `HeaderView``,` and `FooterView` are the same
as in the `06-board-backbone-parse-sdk` project so I won't list them
here again.

We need to change the the model and collection to this from using
`Parse.Object` and `Parse.Collection`. Those are the places where
Backbone.js looks up for REST API URLs corresponding to the specific
collection and model:

        Message = Backbone.Model.extend({
            url: URL + 'messages.json'
        })
        MessageBoard = Backbone.Collection.extend ({
            model: Message,
            url: URL + 'messages.json'
        })

Next is the `HomeView` where most of the logic resides. I made a few
enhancements to the rendering process, which is a good illustration of
what you can do with events in Backbone. First, create the view and
define the element selector, template (loaded via RequireJS and text
plug-in), and event for the SEND button:

        HomeView = Backbone.View.extend({
            el: '#content',
            template: homeTpl,
            events: {
                'click #send': 'saveMessage'
            },

Now, in the constructor of the view set the `homeView` to `this` so we
can use `this` later by the name inside of the closures (otherwise,
`this` can mutate inside of the closures):

            initialize: function() {
                const homeView = this

Then, I attached an event listener `refresh` that will do the rendering.
Prior to that we had the `all` event, which wasn't very good, because it
triggered re-rendering the addition of each message. You see, `fetch`
will trigger `add` as many times as there are messages (10, 100, 1000,
etc.) and if we use `all` event listener, `add` is part of `all`. While
with this custom event `refresh` we can trigger rendering in the
appropriate places (you'll see them later).

                homeView.collection = new MessageBoard()
                homeView.collection.bind('refresh', homeView.render, homeView)
                homeView.collection.fetch({

The `fetch` method will perform GET XHR request and it has `success` and
`error` callbacks:

                    success: function(collection, response, options){
                        console.log('Fetched ', collection)

The next line will trigger rendering only after all the messages are in
the collection (and came from the server response):

                        collection.trigger('refresh')
                    },
                    error: function(){
                        console.error('Error fetching messages')
                    }
                })

This event listener will be triggered by the SEND button as well as by
the `fetch`. To avoid persisting existing records with `message.save()`,
we add the check for the `message.attributes._id`. In other words, if
this an existing message and it comes from the server (`fetch`), then it
will have `_id` and we stop the execution flow. Otherwise, we persist
the message and trigger rendering on success:

                homeView.collection.on('add', function(message) {
                    if (message.attributes._id) return false
                    message.save(null, {
                        success: function(message) {
                            homeView.collection.trigger('refresh')
                            console.log('Saved ', message)
                        },
                        error: function(message) {
                            console.log('error')
                        }
                    })
                })
            },

The rest of the `HomeView` object is the same as in the
`06-board-parse-sdk` project. In the `saveMessage` we get the values of
the username and the message text and add the new message object to the
collection with `collection.add()`. This will call the event listener
`add``,` which we implemented in the `initialize`.

            saveMessage: function(){
                const newMessageForm = $('#new-message')
                const username = newMessageForm.find('[name="username"]').val()
                const message = newMessageForm.find('[name="message"]').val()
                this.collection.add({
                    'username': username,
                    'message': message
                    })
            },

Last, we write or copy the `render` method that takes the template and
the collection, then injects the resulting HTML into the element with ID
content (`this.el`):

            render: function() {
                console.log('Home view rendered')
                $(this.el).html(_.template(this.template)(this.collection))
            }
        })

        app = new ApplicationRouter()
        Backbone.history.start()
    })

Here is the full source code of the
[08-board-ui/app.js](https://github.com/azat-co/fullstack-javascript/blob/master/code/08-board-ui/app.js)
file
(https://github.com/azat-co/fullstack-javascript/blob/master/code/08-board-ui/app.js):

    const URL = 'http://localhost:1337/'
    // const URL ='http://your-app-name.herokuapp.com/'

    require([
        'libs/text!header.html',
        'libs/text!home.html',
        'libs/text!footer.html'],
        function (
            headerTpl,
            homeTpl,
            footerTpl) {

        const ApplicationRouter = Backbone.Router.extend({
            routes: {
                '': 'home',
                '*actions': 'home'
            },
            initialize: function() {
                this.headerView = new HeaderView()
                this.headerView.render()
                this.footerView = new FooterView()
                this.footerView.render()
            },
            home: function() {
                this.homeView = new HomeView()
                this.homeView.render()
            }
        })

        const HeaderView = Backbone.View.extend({
            el: '#header',
            templateFileName: 'header.html',
            template: headerTpl,
            initialize: function() {
            },
            render: function() {
                $(this.el).html(_.template(this.template))
            }
        })

        const FooterView = Backbone.View.extend({
            el: '#footer',
            template: footerTpl,
            render: function() {
                this.$el.html(_.template(this.template))
            }
        })
        const Message = Backbone.Model.extend({
            url: URL + 'messages.json'
        })
        const MessageBoard = Backbone.Collection.extend ({
            model: Message,
            url: URL + 'messages.json'
        })

        const HomeView = Backbone.View.extend({
            el: '#content',
            template: homeTpl,
            events: {
                'click #send': 'saveMessage'
            },

            initialize: function() {
                this.collection = new MessageBoard()
                this.collection.bind('all', this.render, this)
                this.collection.fetch()
                this.collection.on('add', function(message) {
                    message.save(null, {
                        success: function(message) {
                            console.log('saved ' + message)
                        },
                        error: function(message) {
                            console.log('error')
                        }
                    })
                    console.log('saved' + message)
                })
            },
            saveMessage: function(){
                const newMessageForm=$('#new-message')
                const username=newMessageForm.find('[name="username"]').val()
                const message=newMessageForm.find('[name="message"]').val()
                this.collection.add({
                    'username': username,
                    'message': message
                    })
            },
            render: function() {
                console.log(this.collection)
                $(this.el).html(_.template(this.template, this.collection))
            }
        })

        window.app = new ApplicationRouter()
        Backbone.history.start()
    })

This is it. For your reference, the front-end app source code is at
[https://github.com/azat-co/fullstack-javascript/tree/master/code/08-board-u](https://github.com/azat-co/fullstack-javascript/tree/master/code/08-board-ui)
in the GitHub folder. I won't list it here because we had only a few
changes comparing with the Parse SDK project. The next piece of the
puzzle is the back end.

Message Board API
=================

<span id="API" class="anchor"></span>Supplemental video which walks you
through the implementation and demonstrates the project:
http://bit.ly/1QnsvEb.

The back-end Node.js application source code is at
<https://github.com/azat-co/fullstack-javascript/tree/master/code/08-board-api>
in the GitHub folder, which has this structure:

    /08-board-api
        -web.js
        -Procfile
        -package.json

The Procfile is for the Heroku deployment, and the `package.json` is for
project metadata as well as for Hekoru deployment.

The `web.js` file is very similar to the `08-board-api-mongo,` but has
CORS headers and OPTIONS request handler code. The file starts with
importation of dependencies:

    const http = require('http')
    const util = require('util')
    const querystring = require('querystring')
    const client = require('mongodb').MongoClient

Then we set the MongoDB connection string:

    const uri = process.env.MONGOLAB_URI || 'mongodb://@127.0.0.1:27017/messages'
    //MONGOLAB_URI=mongodb://user:pass@server.mongohq.com:port/db_name

We connect to the database using the string and `client.connect` method.
It's important to handle the error and finish the execution flow with
`return` if there's an error:

    client.connect(uri, function(error, db) {
      if (error) return console.error(error)

After we are sure that there were no errors (otherwise the execution
flow won't come to the next line), we select the collection, which is
`messages` in this case:

      const collection = db.collection('messages')

The server code follows. We create the server instance and set up the
origin variable based on the information from the request. This value
will be in the `Access-Control-Allow-Origin`. The idea is that the
response will have the value of the client's URL:

      const app = http.createServer(function (request, response) {
        const origin = (request.headers.origin || '*')

Check for the HTTP method verb. If it's `OPTIONS`, which we must
implement for CORS, we start writing headers to the response object:

        if (request.method == 'OPTIONS') {
          response.writeHead('204', 'No Content', {
            'Access-Control-Allow-Origin': origin,

The next header will tell what methods are supported:

            'Access-Control-Allow-Methods':
              'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'content-type, accept',
            'Access-Control-Max-Age': 10, // In seconds
            'Content-Length': 0
          })
          response.end()

We are done with `OPTIONS`, but we still need to implement `GET` and
`POST`:

        } else if (request.method === 'GET' && request.url === '/messages.json') {
          collection.find().toArray(function(error,results) {
            if (error) return console.error(error)
            const body = JSON.stringify(results)

We need to add a few headers to the response of the `GET`:

            response.writeHead(200,{
              'Access-Control-Allow-Origin': origin,
              'Content-Type': 'text/plain',
              'Content-Length': body.length
            })
            console.log('LIST OF OBJECTS: ')
            console.dir(results)
            response.end(body)
          })

Last but not least, we process `POST`:

        } else if (request.method === 'POST' && request.url === '/messages.json') {
          request.on('data', function(data) {
            console.log('RECEIVED DATA:')
            console.log(data.toString('utf-8'))

We need to parse `data` to get the object so later we can save it into
the database. The next line often causes bugs because front-end apps
send data in one format and the server parses another. Please make sure
to use the same format on the browser and server:

            collection.insert(JSON.parse(data.toString('utf-8')),
            {safe:true}, function(error, obj) {
              if (error) return console.error(error)
              console.log('OBJECT IS SAVED: ')
              console.log(JSON.stringify(obj))
              const body = JSON.stringify(obj)

We add the headers again. Maybe we should write a function and call it
instead of writing the headers manually. Wait? Express.js is actually
will do some of it for us but it's a topic of [another
book](http://proexpressjs.com):

              response.writeHead(200,{
                'Access-Control-Allow-Origin': origin,
                'Content-Type': 'text/plain',
                'Content-Length': body.length
              })
              response.end(body)
            })
          })
        }
      })
      const port = process.env.PORT || 1337
      app.listen(port)
    })

Here is a source code of `web.js`, our Node.js application implemented
with CORS headers:

    const http = require('http')
    const util = require('util')
    const querystring = require('querystring')
    const client = require('mongodb').MongoClient

    const uri = process.env.MONGOLAB_URI || 'mongodb://@127.0.0.1:27017/messages'
    //MONGOLAB_URI = mongodb://user:pass@server.mongohq.com:port/db_name

    client.connect(uri, function(error, db) {
      if (error) return console.error(error)
      const collection = db.collection('messages')
      const app = http.createServer(function (request, response) {
        const origin = (request.headers.origin || '*')
        if (request.method == 'OPTIONS') {
          response.writeHead('204', 'No Content', {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods':
              'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'content-type, accept',
            'Access-Control-Max-Age': 10, // Seconds.
            'Content-Length': 0
          })
          response.end()
        } else if (request.method === 'GET' && request.url === '/messages.json') {
          collection.find().toArray(function(error,results) {
            if (error) return console.error(error)
            const body = JSON.stringify(results)
            response.writeHead(200,{
              'Access-Control-Allow-Origin': origin,
              'Content-Type': 'text/plain',
              'Content-Length': body.length
            })
            console.log('LIST OF OBJECTS: ')
            console.dir(results)
            response.end(body)
          })
        } else if (request.method === 'POST' && request.url === '/messages.json') {
          request.on('data', function(data) {
            console.log('RECEIVED DATA:')
            console.log(data.toString('utf-8'))
            collection.insert(JSON.parse(data.toString('utf-8')),
            {safe:true}, function(error, obj) {
              if (error) return console.error(error)
              console.log('OBJECT IS SAVED: ')
              console.log(JSON.stringify(obj))
              const body = JSON.stringify(obj)
              response.writeHead(200,{
                'Access-Control-Allow-Origin': origin,
                'Content-Type': 'text/plain',
                'Content-Length': body.length
              })
              response.end(body)
            })
          })
        }
      })
      const port = process.env.PORT || 1337
      app.listen(port)
    })

Deployment to Heroku
====================

<span id="heruku" class="anchor"></span>Supplemental video which walks
you through the implementation and demonstrates the project:
http://bit.ly/1QnsvEb.

For your convenience, we have the front-end app at
https://github.com/azat-co/fullstack-javascript/tree/master/code/08-board-ui
and the back-end app with CORS is located at
https://github.com/azat-co/fullstack-javascript/tree/master/code/08-board-api.
By now, you probably know what to do, but as a reference, below are the
steps to deploy these examples to Heroku.

We'll start with the API. In the `08-board-api` folder, execute the
following code (`$ heroku login` is optional):

    $ git init
    $ git add .
    $ git commit -am "first commit"
    $ heroku login
    $ heroku create
    $ heroku addons:create mongolab:sandbox
    $ git push heroku master

Watch the terminal messages. If the API is successfully deployed, you
can test it with CURL or Postman. Then copy the URL from Heroku (e.g.,
https://guarded-waters-1780.herokuapp.com), and paste it into the
`08-board-ui/app.js` file, assigning the value to the URL variable.
Then, in the `08-board-ui` folder, execute:

    $ git init
    $ git add .
    $ git commit -am "first commit"
    $ heroku create
    $ git push heroku master
    $ heroku open

That's it. By now you should be able to see Message Board running in the
cloud with UI (browser app) on one domain and API on another. In
high-trafficked apps, the API will be hiding behind a load balancer so
you can have multiple API servers on a single IP/URL. This way they'll
hande more traffic and the system will become more resilient. You can
take out, restart, or deploy on APIs one at a time with zero down time.

Same Domain Deployment Server
=============================

<span id="same" class="anchor"></span>Supplemental video which walks you
through the implementation and demonstrates the project:
http://bit.ly/1QnsvEb.

Same domain deployment is *not recommended* for serious production
applications, because static assets are better served with web servers
like Nginx (not Node.js I/O engine), and separating API makes for less
complicated testing, increased robustness, and quicker
troubleshooting/monitoring. However, the same app/domain approach could
be used for staging, testing, development environments, and/or tiny
apps.

The idea is that API serves static files for the browser app as well,
not just handling dynamic requests to its routes. So you can copy the
08-board-api code into a new folder 08-board-web. The beginning of the
new server file is the same; we have GET and POST logic (this time CORS
is not needed). The last condition in the chain of `if/else` needs to
process the static files. Here's how we can do it.

    ...
      } else {

We use [the url v0.11.0
module](https://github.com/defunctzombie/node-url) from
https://github.com/defunctzombie/node-url to parse the path name from
the URL. The path name is everything after the domain; for example, in
<http://webapplog.com/es6> the path name is `/es6`. This will be our
folder and file names.

          const uri = url.parse(request.url).pathname

It's good to have some logging to know that our system is working as it
should:

          console.log('Processing path: ', uri)

The next line deals with the root URI; that is, when you go to the web
site and the path is empty or a slash. In this case, let's serve the
`index.html` (if it exists):

          if (uri == '' || uri == '/') uri = 'index.html'

The `path.join()` method will make this code cross-platform by creating
a string with the proper slashes depending on the OS: that is, `\` or
`/` as separator. You can see the resulting path and file name in the
logs:

          filename = path.join(__dirname, staticFolder, uri)
          console.log('Processing file: ', filename)

I always say never use synchronous functions in Node.js, unless you have
to. This is such a case. Without the synch methods, we'll get racing
conditions on our files meaning some will load faster than the others
and cause conflicts:

          stats = fs.statSync(filename)
          if (error) {
            console.error(error)

Obviously, if the file doesn't exist we want to send 404 Not Found:

            response.writeHead(404, {
              'Content-Type': 'text/plain'})
            response.write('404 Not Found\n')
            return response.end()
          }

Let's make sure the requested resource is the file. If it's not the
file, you can implement adding `index.html` as we did for the root. I
don't have this code here. Our front-end app only needs to include files
so this code will serve the files!

          if(!stats.isFile()) {
            response.writeHead(404, {
              'Content-Type': 'text/plain'})
            response.write('404 Not Found\n')
            return response.end()
          } else {

Finally, we read the file. We use the synchronous function again for the
reasons mentioned above.

            const file = fs.readFileSync(filename)
            if (!file) {
              response.writeHead(500,
                {'Content-Type': 'text/plain'})
              response.write(err + '\n')
              return response.end()
            }

I know that Douglas Crockford dislikes `switch`, but we'll use it here
to determine the right content type for the response header. Most
browsers will understand the content type okay if you omit the
`Content-Type` header, but why not go an extra mile?

            const extname = path.extname(filename)
            const contentType = 'text/html'
            switch (extname) {
                case '.js':
                    contentType = 'text/javascript'
                    break
                case '.css':
                    contentType = 'text/css'
                    break
                case '.json':
                    contentType = 'application/json'
                    break
                case '.png':
                    contentType = 'image/png'
                    break
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpg'
                    break
                case '.wav':
                    contentType = 'audio/wav'
                    break
            }
            response.writeHead(200, {
              'Content-Type': contentType,

Another header that we send back with the response is `Content-Length`:

              'Content-Length': file.length
            })
            response.end(file)
          }
        }
    ...

So this piece of code goes into the request handler of the server, which
is inside of the database connect call. Just like the Russian Matreshka
dolls. Confusing? Just refer to the full source code at
<https://github.com/azat-co/fullstack-javascript/tree/master/code/08-board-web>.

Another, more elegant way is to use Node.js frameworks as Connect
(<http://www.senchalabs.org/connect/static.html>), or Express
(http://expressjs.com/en/index.html); because there is a special
`static` middleware for JS and CSS assets. But those frameworks deserve
a book on their own.

Now after you mastered basics of Node.js, MongoDB, Backbone.js, and
Heroku, there's one bonus step to take. Check out the cloud solution
Amazon Web Services known as EC2 (Infrastructure as a Service category
of cloud computing).

<span id="deployment-to-amazon-web-services" class="anchor"><span id="Amazon" class="anchor"></span></span>Deployment to Amazon Web Services
============================================================================================================================================

Cloud is eating the world of computing. There are private and public
clouds. AWS, probably the most popular choice among the public cloud
offerings, falls under the IaaS category. The advantages of using an
IaaS such as AWS over PaaS-like Heroku are as follows:

-   It’s more configurable (any services, packages, or
    operation systems).

-   It’s more controllable. There are no restrictions or limitations.

-   It’s cheaper to maintain. PaaS can quickly cost a fortune for
    high-performance resources.

In this tutorial, we'll be using 64-bit [Amazon Linux
AMI](http://aws.amazon.com/amazon-linux-ami/) with CentOS
(<http://aws.amazon.com/amazon-linux-ami/>).

Assuming you have your EC2 instance up and running, SSH into it and
install all system updates with `yum`:

    $ sudo yum update

You can try installing Node with `yum`. It should be available in the
Extra Packages for Enterprise Linux repository
(<https://fedoraproject.org/wiki/EPEL>):

    $ sudo yum install nodejs npm --enablerepo=epel

This might take a while. Answer with y as the process goes. In the end,
you should see something like this (your results may vary):

`Installed:  nodejs.i686 0:0.10.26-1.el6          npm.noarch 0:1.3.6-4.el6Dependency Installed:...Dependency Updated:...Complete!`

You probably know this, but just in case, to check installations, type
the following:

    $ node –V
    $ npm –v

If the yum Node installation fails, see if you have EPEL (just see if
the command below says `epel`):

    $ yum repolist

If there's no `epel`, run:

    $ rpm -Uvh http://download-i2.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

Then, try to install both Node.js and npm again with:

    $ sudo yum install nodejs npm --enablerepo=epel

Alternatively, you can compile Node from the source. To do so, install
C++ compiler (again with `yum`):

    $ sudo yum install gcc-c++ make

Same with openSSL:

    $ sudo yum install openssl-devel

Then install Git with yum:

    $ sudo yum install git

Finally, clone Node repository straight from GitHub:

    $ git clone git://github.com/joyent/node.git

And build Node.js:

    $ cd node
    $ git checkout v0.10.12
    $ ./configure
    $ make
    $ sudo make install

Note: For a different version of Node.js, you can list them all with
`$ git tag -l` and checkout the one you need.

To install npm, run:

    $ git clone https://github.com/isaacs/npm.git
    $ cd npm
    $ sudo make install

More information on using yum can be found at the following locations:

-   [Managing Software with
    yum](https://www.centos.org/docs/5/html/yum)
    (<https://www.centos.org/docs/5/html/yum>)

-   [Installing Node.js via package
    managers](https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager)
    (<https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager>)

-   [Tips on securing your EC2
    instance](http://aws.amazon.com/articles/1233)
    (<http://aws.amazon.com/articles/1233>)

Once you have Git and npm and Node, you are good to deploy your code
(manually). Pull the code from the repository. You might need to provide
credentials or upload your SSH keys to the AWS. Then start the Node
server with [pm2](https://github.com/Unitech/pm2) (<https://github.com/Unitech/pm2>) or similar process manager (Figure 8-1). `pm2` is good because it has a lot of features not only to keep
the process running but also to scale it; it even has load balancing.

To install pm2:

    $ npm i -g pm2

To start your application:

    $ pm2 start app.js

To list all running processes:

    $ pm2 list

![](media/image1.png)

***Figure 8-1*** *pm2 running multiple Node processes.*

That's pretty much all you need to do. Ideally you want to automate the
deployment. Also, you might want to add some `d.init` or `upstart`
scripts to launch your `pm2` or another process manager automatically.

Steps for other OS on AWS are similar. You would use their package
manager to install Node, Git, and npm, then get the code (Git or rsync)
and launch it with the process manager. You don't need the process
manager. You can launch with `node` itself, but it's better to use some
process manager.

Now, while the Node.js app is running, executing $ netstat -apn | grep
80, the remote machine should show the process. For example, for a Node
app listening on port 80:

    tcp        0      0 0.0.0.0:80                  0.0.0.0:*                   LISTEN      1064/node

On the EC2 instance, either configure the firewall to redirect
connections (e.g., port to Node.js 3000, but this is too advanced for
our example) or disable the firewall (okay for our quick demonstration
and development purposes):

    $ service iptables save$ service iptables stop$ chkconfig iptables off

In the AWS console, find your EC2 instance and apply a proper rule to
allow for inbound traffic, for example,

    Protocol: TCPPort Range: 80Source: 0.0.0.0/0

And from your local machine, that is, your development computer, you can
either use the public IP or the public DNS (the Domain Name System)
domain, which is found and copied from the AWS console under that
instance’s description. For example,

    $ curl XXX.XXX.XXX.XXX –v

It’s worth mentioning that AWS supports many other operating systems via
its AWS Marketplace (<https://aws.amazon.com/marketplace>). Although AWS
EC2 is a very popular and affordable choice, there other alternatives as
well: [Joyent](http://www.joyent.com) (<https://www.joyent.com>),
[Windows Azure](https://azure.microsoft.com/en-us)
(https://azure.microsoft.com/en-us), [Rackspace Open
Cloud](http://www.rackspace.com/cloud) (<http://www.rackspace.com/cloud>),
and others.

Summary
=======

This chapter deals with descriptions of different deployment approaches,
the final version of Message Board application, and its deployment with
two approaches: different and the same domains. We covered deployment
using the Git and Heroku command-line interfaces to deploy to PaaS. And
we worked through examples of installing and building a Node.js
environment on AWS EC2 and running Node.js apps on AWS with CentOS.
