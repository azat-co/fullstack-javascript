/*
Rapid Prototyping with JS is a JavaScript and Node.js book that will teach you how to build mobile and web apps fast. — Read more at
http://rapidprototypingwithjs.com.
*/
var mongodb = require('mongodb');
var url = require('url');
var log = console.log;
var dbUri = process.env.MONGOHQ_URL || 'mongodb://localhost:27017/test';

var connectionUri = url.parse(dbUri);
var dbName = connectionUri.pathname.replace(/^\//, '');

mongodb.Db.connect(dbUri, function(error, client) {
  if (error) throw error;

  client.collectionNames(function(error, names){
    if(error) throw error;

    //output all collection names
    log("Collections");
    log("===========");
    var lastCollection = null;
    names.forEach(function(colData){
      var colName = colData.name.replace(dbName + ".", '')
      log(colName);
      lastCollection = colName;
    });
    if (!lastCollection) return;
    var collection = new mongodb.Collection(client, lastCollection);
    log("\nDocuments in " + lastCollection);
    var documents = collection.find({}, {limit:5});

    //output a count of all documents found
    documents.count(function(error, count){
      log("  " + count + " documents(s) found");
      log("====================");

      // output the first 5 documents
      documents.toArray(function(error, docs) {
        if(error) throw error;

        docs.forEach(function(doc){
          log(doc);
        });
     
        // close the connection
        client.close();
      });
    });
  });
});
