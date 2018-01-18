'use strict';
var getuserrelation = require('./getrelation').getuserrelation;
var getallrelation = require('./getrelation').getallrelation;
var getallhiperapar = function (module, release, callbackall) {

  getuserrelation(module, release, function (data) {
    // console.log(data[0].RANK);
    if(data==null||data==undefined||data[0]==null){
          var rank=0;
          callbackall();
    }else {
       var rank = data[0].RANK;
      getallrelation(module, release,rank, function (data1) {
        callbackall(data1)
      });
    }

    //=========
  });
};


// var module = { MEPLID: 5877,
//   LDMOD: 'DSNZCMD',
//   MODULE: 'DSNZCMD1',
//   PTFID: 'UK97693',
//   UNOFFPTF: null }
//
//  var release="A";
// getallhiperapar(module,release,function (data) {
//   console.log(data);
// });

exports.getallhiperapar = getallhiperapar;
