var app = require('../../server');
var db = app.dataSources.db;

var User = db.define('User_t', {
  name: {type: String},
  email: {type: String},
});

db.automigrate('User_t', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  User.create({
    name: 'Tony',
    email: 'tony@t.com',
    pe:false,

  }, function(err, user) {
    console.log(err, user);
  });

  User.find({where: {name: 'Tony'}}, function(err, users) {
    console.log(err, users);
  });

  // User.destroyAll(function() {
  //   console.log('example complete');
  // });
});
