'use strict';
var Pool = require('ibm_db').Pool;
var pool = new Pool();
// let cn = 'DATABASE=simpledb;HOSTNAME=9.110.84.37;PORT=50000;PROTOCOL=TCPIP;UID=CDLadmin;PWD=IBM11ibm';
let cn = 'DATABASE=simpledb;HOSTNAME=9.111.213.249; PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm';
pool.setMaxPoolSize(400);
function init() {
  console.log("init db2...")
  let ret = pool.init(50, cn);
  if (ret == true) {
    console.log('db2 pool init 50 connnections');
  } else {
    console.error('\n=====================   error!   ===================================\ndb2 connection faile,please check your db2 connection\n====================================================================\n')
  }
}

exports.pool = pool;
exports.cn = cn;
exports.init = init;
