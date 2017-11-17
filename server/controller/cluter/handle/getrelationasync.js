'use strict'
var db = require('ibm_db'),
  connStr = 'DATABASE=simpledb;HOSTNAME=9.111.212.250;PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm';


function getRank(meplitem, release, callback) {
  db.open(connStr, function (err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    connection.query('select * from relations_a where  module=? and ptfid=? and release=?', [meplitem.MODULE, meplitem.PTFID, release], function (err1, rows) {
      if (err1) {
        console.log(err1);
        return;
      } else {
        //  console.log(rows)
        callback(rows);
        connection.close(function (err2) {
          if (err2) console.log(err2);
        });
      }
    });
  });
}


function getApars(meplitem,release,rank,callback) {
  db.open(connStr, function (err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    connection.query('select * from relations_a  where  module=?  and release=? and rank<=?', [meplitem.MODULE, release,rank], function(err1, rows) {
      if (err1) {
        console.log(err1);
        return;
      } else {
        //  console.log(rows)
        callback(rows);
        connection.close(function (err2) {
          if (err2) console.log(err2);
        });
      }
    });
  });

}
function  getallapars(meplitem,release,callbackall) {
 getRank(meplitem,release,function (data) {
   if(data==null||data==undefined||data[0]==null){
           callbackall()
   }else {
     getApars(meplitem,release,data[0].RANK,function (data2) {
       callbackall(data2)
     })
   }

 })
}

exports.getApars=getApars;
exports.getRank = getRank;
exports.getallapars=getallapars;
// // test
// var release='A';
// var module = {MODULE: 'DSN3SPTN', PTFID: 'UK57370'};
// getRank(module, release, function(data) {
//   console.log('data' + JSON.stringify(data) + 'end');
//   getApars(module,release,data[0].RANK,function (data) {
//     console.log(data)
//   })
// });


// getallapars({ MEPLID: 5877,
//   LDMOD: 'DSN3AMGP',
//   MODULE: 'DSN3AAES',
//   PTFID: 'UK57370',
//   UNOFFPTF: null },"A",function (data) {
//   console.log(data)
// })
