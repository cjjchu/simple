'use strict';
var async = require('async');
var mepl = require('../status/getmepl');
var scon = require('../status/getmeplitems');
var handle = require('./handlerelations');
var hiper = require('./gethiper');
var db2 = require('../db2/db2pool');
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/simple'; // # 数据库为 runoob

let hipercoun = 0;
let test = 0;
var contro = function(meplid, release, callbackall) {
  scon.getmeplitems(meplid, function(data1) {
   // data1 = data1.slice(0, 40);
    let hiperarr = [];

    console.time('resu');
    async.mapLimit(data1, 40, function(it, callback1) {
// =============

      handle.getallhiperapar(it, release, function(data2) {
        if (data2 == null || data2[0] == null) {
          callback1();
        } else {
 // =====
          async.mapLimit([...data2], 20, function(it2, callback2) {
           // console.log(it2)
            hiper.gethiper(it2, function(data3) {
              if (data3 === null || data3.length === 0) {
                callback2();
              } else {

                callback2(null, data3);
              }
            });
          }, function(err, data4) {

            let dl = (data4.length - 1);
            let  t = 0;
            for (let i in data4) {
              if (data4[i] == null) {} else {
                t++;
              }
              if (i == dl) {
                process.stdout.write('.');
                if (t > 0) {
                  test++;
                }
                callback1(null, ...data4);
              }
            }
           // console.log(data4)
          });
// ==========
        }
      });
// ============
    }, function(err, result) {
      console.timeEnd('resu');
      if (err) {
        console.log(err);
        return;
      }
      console.log('\nget all hiper');
      console.log(test);
      callbackall(result);

// =====================================get hiper
//       var hipercount = 0;
//       async.mapLimit(result, 80, function(it, callback) {
//         process.stdout.write('.');
//         if (it == undefined) {
//           callback();
//         } else {
//           hiper.gethiper(it, function(data) {
//             callback(null, ...data);
//           });
//         }
//       }, function(err, result) {
//         var resultarr=[]
//         let l = (result.length - 1);
//         for (let i in result) {
//           if (result[i] == undefined || result[i]==null) {
//           //  result.slice(i, 1);
//           } else {
//             resultarr.push(result[i])
//             console.log(result[i]);
//             console.log(hipercount++);
//           }
//           if (i == l) {
//             callbackall(resultarr);
//           }
//         }
//       });

// ========get hiper============
    });
    // =============================
  });
};

exports.analyzestatue = contro;

contro('5877', 'A', function(data) {
 // console.log(data)
  console.log('analy');
  let dl = (data.length - 1);

  // MongoClient.connect(DB_CONN_STR, function(err, conn) {
  //   conn.collection('hiperold').insert(data, function(err, data) {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log(data);
  //     conn.close();
  //   });
  // });
  //
  // console.log(data.length);
  // console.log('end');
  // console.log(hipercoun)
});

function ayalymongodb() {

}
