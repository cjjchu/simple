'use strict';
var Pool = require('ibm_db').Pool;
var  pool = new Pool();

//   cn = 'DATABASE=simpledb;HOSTNAME=9.110.84.37;PORT=50000;PROTOCOL=TCPIP;UID=CDLadmin;PWD=IBM11ibm';

var cn = 'DATABASE=simpledb;HOSTNAME=9.111.212.250;' +
  'PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm';
pool.setMaxPoolSize(500);

var ret = pool.init(50, cn);
if (ret != true) {
  console.log('db2 pool init 50 connnections');
  return false;
}

exports.pool = pool;
exports.cn = cn;
