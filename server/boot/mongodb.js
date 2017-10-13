var MongoClient = require('mongodb').MongoClient,
 test = require('assert');
MongoClient.connect('mongodb://localhost:27017/simple', function(err, db) {
  test.equal(null, err);

  // Create a capped collection with a maximum of 1000 documents
  db.createCollection("a_simple_collection", {capped:true, size:10000, max:1000, w:1}, function(err, collection) {
    test.equal(null, err);

    // Insert a document in the capped collection
    collection.insertOne({a:1}, {w:1}, function(err, result) {
      test.equal(null, err);

      db.close();
    });
  });
});
