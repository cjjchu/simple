'use strict';
var fs = require('fs');
var app = require('../../server');
var openDB2 = function () {
  var db2 = app.dataSources.db2;
  var db = app.dataSources.db;
  var User = db.define('User_t', {
    name: {type: String},
    email: {type: String},
  });
  //
  db2.connector.execute('select userid, meplid, subsys, release, subrelease, comment, date from mepls_a ', function (err, cb) {
    if (err) {
      console.log(err)
    }
    console.log(cb);
  })

  //   id_a.create({ID:132,IDNAME:"ads"},function (err,data) {
  //     console.log(err,data)
  //   })
  // });
  //
  // id_a.find({}, function(err, data) {
  //   console.log(err, data);
  // });
  var db_t = app.models.DB_T;
// db.automigrate("DB_T",function (err) {
// db_t.create({name:"ads"},function (err,data) {
//   console.log(err,data)
// })
// })

  // db_t.create({name: "asd"}, function (err, data) {
  //   console.log(err, data)
  // })
  //
  // db_t.find({}, function (err, data) {
  //   console.log(err, data)
  // })


  db2.connector.execute('select * from id_a', function (err, cb) {
    if (err) {
      console.log(err);
    }
    fs.writeFileSync('./output.json', JSON.stringify(cb));
    var JsonObj = JSON.parse(fs.readFileSync('./output.json'));
    console.log(JsonObj);

    fs.readFile('C:\\nodes\\hiper.txt', function (err, data) {
      console.log(data.toString())
    })
    // var data = JSON.parse(fs.readFileSync("C:\\nodes\\hiper.txt"))
    // fs.writeFileSync('./out.json',data)
    console.log(cb);
  });
};


openDB2();

