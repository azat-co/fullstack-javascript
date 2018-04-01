const http = require('http'),
  url = require('url'),
  path = require('path'),
  fs = require('fs'),
  port = process.env.PORT || 1337,
  staticFolder = 'public',
  client = require('mongodb').MongoClient

const uri = process.env.MONGOLAB_URI || 'mongodb://@127.0.0.1:27017/messages'
//MONGOLAB_URI=mongodb://user:pass@server.mongohq.com:port/db_name

client.connect(uri, function(error, db) {
  if (error) return console.error(error)
  const collection = db.collection('messages')

  http.createServer(function(request, response) {
    const origin = (request.headers.origin || '*')
    if (request.method == 'OPTIONS') {
      response.writeHead('204', 'No Content', {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'content-type, accept',
        'Access-Control-Max-Age': 10, // In seconds
        'Content-Length': 0
      })
      response.end()
    } else if (request.method === 'GET' && request.url === '/messages.json') {
      collection.find().toArray(function(error,results) {
        if (error) return console.error(error)
        const body = JSON.stringify(results)
        response.writeHead(200,{
          'Access-Control-Allow-Origin': origin,
          'Content-Type':'text/plain',
          'Content-Length':body.length
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
            'Content-Type':'text/plain',
            'Content-Length':body.length
          })
          response.end(body)
        })
      })
    } else {
      const uri = url.parse(request.url).pathname
      console.log('Processing URI: ', uri)
      if (uri == '' || uri == '/') uri = 'index.html'
      filename = path.join(__dirname, staticFolder, uri)
      console.log('Processing file: ', filename)
      try {
        stats = fs.statSync(filename)
      } catch (error) {
        if (error) {
          console.error(error)
          response.writeHead(404, {
            'Content-Type': 'text/plain'})
          response.write('404 Not Found\n')
          return response.end()
        }
      }
      if(!stats.isFile()) {
        response.writeHead(404, {
          'Content-Type': 'text/plain'})
        response.write('404 Not Found\n')
        return response.end()
      } else {
        const file = fs.readFileSync(filename)
        if (!file) {
          response.writeHead(500,
            {'Content-Type': 'text/plain'})
          response.write(err + '\n')
          return response.end()
        }
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
          'Content-Length': file.length
        })
        response.end(file)
      }
    }
  }).listen(port)

  console.log('Static file server running at\n '+
  ' => http://localhost:' + port + '/\nCTRL + C to shutdown')

})
