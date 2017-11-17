'use strict';
var db=require('../db2/db2pool');

var getmepl = function(userid,callback) {
/*  new Promise(function(resolve, reject) {
  }).then(); */

  db.pool.open(db.cn, function(err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    connection.query('select * from mepls_a where  userid=?', [userid], function(err1, rows) {
      if (err1) {
        console.log(err1);
        return;
      } else {
        connection.close(function(err2) {
          if (err2) console.log(err2);
        //  console.log(rows)
          callback(rows);
        });
      }
    });
  });
};

// getmepl('AVMEV2672',function (data) {
//   console.log(data)
// });

exports.getmepl = getmepl;

// var a = [[1,2,3],[4,5,6],[7,8,9]]
// var b = []
//
// new Promise(function(resolve, reject) {
//
//   for (var i = 0; i < a.length; i++) {
//     for (var j = 0; j < a[i].length; j++) {
//       b.push(a[i][j])
//       console.log(a[i][j]);
//       if(i+1 === a.length && j+1 === a[i].length) resolve()
//     }
//   }
// }).then(console.log(b));

