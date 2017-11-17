'use strict';
var db=require('../db2/db2pool');

var getmeplitems = function (meplid, callback) {
  /*  new Promise(function(resolve, reject) {
    }).then(); */

  db.pool.open(db.cn, function (err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    connection.query("select * from  meplitems_a  where trim(ptfid) != '' and meplid=?" , [meplid], function (err1, rows) {
      if (err1) {
        console.log(err1);
        return;
      } else {
        callback(rows);
        connection.close(function (err2) {
          if (err2) console.log(err2);
          //  console.log(rows)

        });
      }
    });
  });
};





/*
* ================================
*    get hiper from apars
* =================================
* */
var getaparhiper = function (apars, callback) {
// hipper apars
  var hapars = [];

  ibmdb.open(connStr, function (err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    var pa = new Promise(function (resolve, reject) {
      resolve()
    })
    pa.then(function () {
      for (var i in apars) {
        connection.query('select * from apars_a where  aparid =?', apars, function (err1, data) {
          if (err1) {
            console.log(err1);
            return;
          } else {
            if (data[0].HIPER == 1) {
              hapars.push(data[0].APARID);
            }
          }
        });
      }
    }).then(function () {
      connection.close(function (err2) {
        if (err2) console.log(err2);
        if(hapars===null||hapars==undefined||hapars.length==0){
          callback(0);
        }
        else (
          callback(1)
        )

      });
    })


  })
  ;
};

// getmeplitems('5877',function (data) {
//  // console.log(data)
//   console.log(data.length)
// });



// var module = {MODULE: 'DSN3SPTN', PTFID: 'UK57370', RELEASE: 'A'};
// gethiper_a(module,function (data) {
// console.log("=========="+data)
// })




exports.getmeplitems = getmeplitems;

