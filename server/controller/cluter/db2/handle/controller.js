'use strict';
var fs = require('fs');
var app = require('../../../server');
var openDB2 = function() {
  var db2 = app.dataSources.db2;
  var db = app.dataSources.db;
  db2.connector.execute('select userid,meplid from mepls_a  where userid=? ', ['AVMEV4672'], function(err, data) {
    console.log(data);
    var mid = [];
    for (var i in data) {
      mid[i] = data[i].MEPLID;
    }
    console.log(mid);
    fs.writeFile('./data.json', JSON.stringify(data), function(err) {
    });
    fs.writeFile('./j.json',JSON.stringify(data),function (err,data) {
    console.log(err)
    })

  });

  // db2.connector.execute('select * from MEPLITEMS_A ', null, function(err, data) {
  //   console.log('sss');
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   fs.writeFile('./db2.json',JSON.stringify(data),function (err) {
  //     if(err){
  //       console.log(err)
  //       return
  //     }
  //   })
  // //  console.log(err, data);
  // });

};

openDB2();

