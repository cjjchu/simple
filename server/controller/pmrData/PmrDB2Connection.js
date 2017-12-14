'use strict';
var Pool = require('ibm_db').Pool;
var pool = new Pool();
let cn = 'DATABASE=DSN2SSDF;HOSTNAME=BLDSSDF.BOULDER.IBM.COM;PORT=446;PROTOCOL=TCPIP;UID=huimin;PWD=p6ssword';
pool.setMaxPoolSize(400);
function init() {
  console.log('init db2...');
  let ret = pool.init(20, cn);
  if (ret == true) {
    console.log('db2 pool init 50 connnections');
  } else {
    console.error('\n=====================   error!   ===================================\ndb2 connection faile,please check your db2 connection\n====================================================================\n');
    console.log(cn);
  }
}
exports.pool = pool;
exports.cn = cn;
exports.init = init;

// init()
