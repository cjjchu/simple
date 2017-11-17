'use strict';
var async = require('async');
var mepl = require('../status/getmepl');
var scon = require('../status/getmeplitems');
var handle = require('./handlerelations');
var hiper = require('./gethiper');
var hiper = require('./gethiper');
var db2=require('../db2/db2pool');
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/simple'; // # 数据库为 runoob
var coun = 0;
var contro = function(meplid, release, callbackall) {
  var ary = [];
  scon.getmeplitems(meplid, function(data1) {
    // =========test============
    // data1 = data1.slice(0, 1000)
    let apararr = [];
    console.time('resu');
    async.mapLimit(data1, 40, function(it, callback) {

      handle.getallhiperapar(it, release, function(data) {
        if (data == null) {
          callback(null);
        } else {
          process.stdout.write('.');
          callback(null, ...data
          );
        }
      });
    }, function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      // console.log(result)
      console.log('\nget all apar');
      console.log(result.length);
      console.timeEnd('resu');
// =====================================get hiper
      var hipercount = 0;
      async.mapLimit(result, 80, function(it, callback) {
        process.stdout.write('.');
        if (it == undefined) {
          callback();
        } else {
          hiper.gethiper(it, function(data) {
            callback(null, ...data);
          });
        }
      }, function(err, result) {
        var resultarr=[]
        let l = (result.length - 1);
        for (let i in result) {
          if (result[i] == undefined || result[i]==null) {
          //  result.slice(i, 1);
          } else {
            resultarr.push(result[i])
            console.log(result[i]);
            console.log(hipercount++);
          }
          if (i == l) {
            callbackall(resultarr);
          }
        }
      });

// ====================
    });
    // =============================
  });
};

exports.analyzestatue = contro;

contro('5877', 'A', function(data) {

  MongoClient.connect(DB_CONN_STR,function (err,conn) {
    conn.collection('hiperold').insert(data,function (err,data) {
      if(err){console.log(err)
      return}
         console.log(data)
      conn.close()
    })
  })





  console.log(data.length);
  console.log('end');
});
