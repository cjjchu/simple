'use strict';
var db=require('../db2/db2pool');

var getuserrelation = function(meplitem, release, callback) {
  db.pool.open(db.cn, function(err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    connection.query('select * from relations_a where  module=? and ptfid=? and release=?', [meplitem.MODULE, meplitem.PTFID, release], function(err1, rows) {
      if (err1) {
        console.log(err1);
        return;
      } else {
      //  console.log(rows)
        callback(rows);
        connection.close(function(err2) {
          if (err2) console.log(err2);
        });
      }
    });
  });
};

var getallrelation = function(meplitem, release,rank, callback) {
  db.pool.open(db.cn, function(err, connection) {
    if (err) {
      console.log(err);
      return;
    }
    connection.query('select * from relations_a  where  module=?  and release=? and rank<=?', [meplitem.MODULE, release,rank], function(err1, rows) {
      if (err1) {
        console.log(err1);
        return;
      } else {
        if(rows.length==0){
          callback()
        }else {
          callback(rows);
        }
        connection.close(function(err2) {
          if (err2) console.log(err2);
        });
      }
    });
  });
};

// // test
//var module = {MODULE: 'DSN3SPTN', PTFID: 'UK57370'};
// getuserrelation(module, 'A', function(data) {
//   console.log('data' + JSON.stringify(data) + 'end');
// });
// //
// getallrelation(module, 'A', function(data) {
//   console.log(data);
// });

exports.getuserrelation = getuserrelation;
exports.getallrelation = getallrelation;
