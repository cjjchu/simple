'use strict';
var async = require('async');
var scon = require('../status/getmeplitems');
var relaasync = require('./getrelationasync');
var hiper = require('./gethiper');

var contro = function(meplid, release, callbackall) {
  console.time('get hiper');
  // =============

  var ary = [];
  for (var i = 0; i < 10; i++) {
    ary.push(1);
  }
  // ==============
  let apararr = [];
  let coun = 0;
  scon.getmeplitems(meplid, function(data1) {
         data1 = data1.slice(0, 500);
    // =====================for
        console.time("forloop")
    for(let i in data1){
      relaasync.getallapars(data1[i],release,function (data) {
        console.log(data)
        console.log(i)
        if(i==(data1.length-1)){
          console.timeEnd("forloop")
        }
      } )
    }
// ==============================
    // ===for 40
    //=====================
    // let tmparr = [];
    // let resarr=[]
    // let i = 0;
    // let l = data1.length;
    // function arrpop() {
    //   tmparr = data1.slice(i, i += 40);
    //   var tl=tmparr.length;
    //   for (let j in tmparr) {
    //     relaasync.getallapars(data1[j], release, function(data) {
    //       process.stdout.write('.');
    //       resarr.push(...data);
    //       console.log(coun++)
    //       if(j=(tl-1)){
    //         if (i <= l) {
    //           arrpop();
    //         }
    //       }
    //       if(coun==(l-1)){
    //         callbackall(resarr)
    //       }
    //     });
    //   }
    // }
    // arrpop();
// ==========================

    // ==============every limit==================async ufn
    // async.everyLimit(data1, 30, function(it, callback) {
    //      // console.log(it)
    //   relaasync.getallapars(it, release, function(data2) {
    //     process.stdout.write('.');
    //     if (data2 == null || data2[0] == null || data2[0] == undefined) {
    //       callback();
    //     } else {
    //       apararr.push(...data2);
    //       callback(null, ...data2);
    //     }
    //   });
    // }, function(err, result) {
    //   if (err) {
    //     console.log('err');
    //     console.log(err);
    //     return;
    //   }
    //   callbackall(apararr)
    //   });
      // ================================calcute
  });
};

contro('5877', 'A', function(data) {
  console.log(data);
  console.log('end');
  console.log(data.length);
  console.timeEnd('get hiper');
  // console.log(data.length);
});
