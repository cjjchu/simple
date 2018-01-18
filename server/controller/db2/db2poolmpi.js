'use strict';
let Pool = require('ibm_db').Pool;
let  pool = new Pool();
var db2 = require(__dirname+'./../../datasources').db2_blue;
let connectStr = 'DATABASE=' + db2.database +
  ';HOSTNAME=' + db2.hostname +
  ';UID=' + db2.username +
  ';PWD=' + db2.password +
  ';PORT=' + db2.port +
  ';PROTOCOL=TCPIP';
pool.setMaxPoolSize(500);
let ret = pool.init(20, connectStr);
if (ret !== true) {
  console.log('  ==db2 has somethingwrong');
  return false;
}

exports.pool = pool;
exports.connectStr = connectStr;
