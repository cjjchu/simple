'use strict';
var ibmdb = require('ibm_db'),
  connStr = 'DATABASE=simpledb;HOSTNAME=9.111.212.250;PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm';
// var ibmdb = require('ibm_db'),
//   connStr = 'DATABASE=simpledb;HOSTNAME=9.110.84.37;PORT=50000;PROTOCOL=TCPIP;UID=CDLadmin;PWD=IBM11ibm';
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/simple'; // # 数据库为 runoob

MongoClient.connect(DB_CONN_STR,function (err,connmon) {
//===========

  let coun = 0;
  ibmdb.open(connStr, function(err, conn) {
    conn.queryResult('select * from apars_a', function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      var data;
      while (data = result.fetchSync()) {
        console.log(data);
        connmon.collection("relations_a").insert(data,function (err,data) {
          if(err){ console.log(err);return }
          process.stdout.write('.')
        })
        console.log(coun++)
      }
      conn.closeSync();
    });
  });

//==========
})
