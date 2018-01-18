'use strict';
var ibmdb = require('ibm_db'),
  connStr = 'DATABASE=simpledb;HOSTNAME=9.111.212.250;PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm';
var fs = require('fs');

var arr = [100000];
var i = 0;

var wr = fs.createWriteStream('./db2.json');

ibmdb.open(connStr, function(err, conn) {
  var stream = conn.queryStream('select * from meplitems_a');
  stream.on('data', function(data) {
    i++;
   // console.log(JSON.stringify(data));
    stream.pause();
    fs.writeFile('t.json', JSON.stringify(data), {flag: 'a'}, function(err) {
      if (err) {
        console.log(err);
      }
      console.log(i);
      stream.resume();
    });
/*
    setTimeout(function() {
                              }, 1000); */
  });

  stream.once('err', function(err) {
    console.log(err);
  });
  stream.once('end', function() {
    console.log('======================end');
  });
});
