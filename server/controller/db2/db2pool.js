var Pool = require('ibm_db').Pool,
var  pool = new Pool(),
var cn = 'DATABASE=simpledb;HOSTNAME=9.111.212.250;PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm';
//pool.setMaxPoolSize(10);

exports.pool=Pool;
exports.cn=cn;
