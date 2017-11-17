'use strict';
var db = require('../db2/db2pool');

var gethiper = function(relation, callback) {
      db.pool.open(db.cn, function(err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    connection.query('select * from apars_a where  hiper = 1 and aparid=? ', [relation.APARID], function(err1, rows) {
      if (err1) {
        console.log(err1);
        return;
      } else {

        if(rows!=null){
          callback(rows);
        }else {
          callback()
        }
        connection.close(function(err2) {
          if (err2) console.log(err2);
        });
      }
    });
  });

};

// var relation = {
//   MODULE: 'DSN3SPTN',
//   APARID: 'PQ25546',
//   PREVAPAR: 'NULL',
//   PTFID: 'UK57370',
//   TYPE: 2,
//   RANK: 4,
//   RELEASE: 'A',
//   SUBRELEASE: 1,
// };
//
// var relation=[ { MODULE: 'DSNNSISC',
//   APARID: 'PM86674',
//   PREVAPAR: 'PM22038',
//   PTFID: 'UK95040',
//   TYPE: 2,
//   RANK: 1,
//   RELEASE: 'A',
//   SUBRELEASE: 1 },
//   { MODULE: 'DSNNSISC',
//     APARID: 'PM22038',
//     PREVAPAR: 'PM19408',
//     PTFID: 'UK60514',
//     TYPE: 2,
//     RANK: 2,
//     RELEASE: 'A',
//     SUBRELEASE: 1 } ]
//
// gethiper(relation, function(data) {
//   console.log(data);
// });

exports.gethiper = gethiper;
