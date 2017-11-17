'use strict'
var Pool = require('ibm_db').Pool;
var  pool = new Pool();

var cn = 'DATABASE=simpledb;HOSTNAME=9.111.212.250;' +
  'PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm';

pool.setMaxPoolSize(500);


var ret = pool.init(50, cn);
if(ret != true)
{
  console.log(ret);
  return false;
}

pool.open(cn,function (err ,conn) {
  console.log(conn)
  console.log(pool)
})

function  createpool() {
  setTimeout(function () {
    pool.open(cn,function (err ,conn) {
      conn.query("select * from mepls_a",function (err,data) {
        process.stdout.write('.')
      })
    //  console.log(conn)
      console.log(pool)
      createpool()
    })
  },500)
}
//createpool()
