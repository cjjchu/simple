// 'use strict';
// var Pool = require('ibm_db').Pool;
// var pool = new Pool();
// let cn = 'DATABASE=DSN2SSDF;HOSTNAME=BLDSSDF.BOULDER.IBM.COM;PORT=446;PROTOCOL=TCPIP;UID=huimin;PWD=p6ssword';
// pool.setMaxPoolSize(400);
// function init() {
//   console.log('init db2...');
//   let ret = pool.init(20, cn);
//   if (ret == true) {
//     console.log('db2 pool init 50 connnections');
//   } else {
//     console.error('\n=====================   error!   ===================================\ndb2 connection faile,please check your db2 connection\n====================================================================\n');
//     console.log(cn);
//   }
// }
// exports.pool = pool;
// exports.cn = cn;
// exports.init = init;
//
// // // init()
// res1='90015,124,672.PMS0088.QP.MEPLA4.D171217.T003354.QPCAP2D.TRS'
// let tes = /\.mepl/g;
// if (tes.test(res1)){
//   console.log("done")
// }
// var fs=require('fs')
// fs.readFile('./meplid.json',function (err,data) {
//   console.log()
//   data='['+data+']'
//   console.log(JSON.parse(data))
// var a=JSON.parse(data)
//   a.forEach(function (ele) {
//     if(ele.MEPLID==null){
//       console.log("done")
//     }
//     console.log(ele.MEPLID)
//
//   })
// })
