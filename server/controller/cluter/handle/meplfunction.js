var async = require('async');
var handle = require('./handlerelations');
var hiper = require('./gethiper');

let release='A'
function abalyzehiper(data1,callbackall) {

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
}, function(err, result1) {
  if (err) {
    console.log(err);
    return;
  }
  // console.log(result)
  console.log('\nget all apar');
  console.log(result1.length);

// =====================================get hiper
  var hipercount = 0;
  async.mapLimit(result1, 40, function(it, callback) {
    process.stdout.write('.');
    if (it == undefined) {
      callback();
    } else {
      hiper.gethiper(it, function(data) {
        callback(null, ...data);
      });
    }
  }, function(err, result) {

    var resultarr = [];
    let l = (result.length - 1);
    for (let i in result) {
      if (result[i] == undefined || result[i] == null) {
        //  result.slice(i, 1);
      } else {
        resultarr.push(result[i]);
     //   console.log(result[i]);
      //  console.log(hipercount++);
      }
      if (i == l) {
        callbackall(resultarr);
      }
    }
  });
// ====================
});
}

exports.abalyzehiper=abalyzehiper;
