'use strict'
var ibmdb = require('ibm_db'),
  connStr = 'DATABASE=simpledb;HOSTNAME=9.111.213.249;PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM33ibm';
// var ibmdb = require('ibm_db'),
//   connStr = 'DATABASE=simpledb;HOSTNAME=9.110.84.37;PORT=50000;PROTOCOL=TCPIP;UID=CDLadmin;PWD=IBM11ibm';

ibmdb.open(connStr, function(err, connection) {
  if (err) {
    console.log(err);
    return;
  }
  connection.query("select * from relations_a where module='DSN3AMT2' and release='A'", function(err1, data) {
    if (err1) {
      console.log(err1);
      return;
    }
      console.log(data);
    connection.close(function(err2) {
      if (err2) console.log(err2);
    });
  });
});

