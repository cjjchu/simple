'use strict';
var ibmdb = require('ibm_db'),
  connStr = 'DATABASE=simpledb;HOSTNAME=9.111.212.250;PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm';
// var ibmdb = require('ibm_db'),
//   connStr = 'DATABASE=simpledb;HOSTNAME=9.110.84.37;PORT=50000;PROTOCOL=TCPIP;UID=CDLadmin;PWD=IBM11ibm';
let coun = 0;
ibmdb.open(connStr, function(err, conn) {
  conn.queryResult('select * from relations_a', function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    var data;
    while (data = result.fetchSync()) {
      console.log(data);
    }

    // drop the table and close connection.
  //  conn.querySync("drop table mytab");
    conn.closeSync();
  });
});
