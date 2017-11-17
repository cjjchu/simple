const db2 = require('../db2/db2pool');

const getmepls = require('./getmepls').getmepls;
const getmeplitems = require('./getmeplitems').getmeplitems;
const getrelationsnoptf = require('./getrelations').getrelationsnoptfid;
const async = require('async');
var fs = require('fs')





function controlle(meplid, release, calllbackall) {
  let coun=0;
  console.time("spend time:")
  getmeplitems(meplid, function (meplitems) {
    console.log("mepl number:"+meplitems.length)
    let resuarr = [];
    console.log(meplitems[0])
    console.timeEnd("spend time:")

  });
}

function getHiper(meplid, release, callbackall) {
  controlle(meplid, release, function (data) {
    if (data == null || data.length == 0) {
      callbackall('No such data found')
    } else {
      readptfsame(data, function (data1) {
        console.log('hiper number:' + data1.length);
        callbackall(null, data1);
      })
    }
  })
}

//测试对外接口
// let meplid='5877';
// let release='A'
// getHiper(meplid,release,function (err,data) {
//   if(err){console.log(err);return}
//   // console.log(data)
//   console.log(data.length)
// })



getmepls('AVMEV2672',function (data) {
  console.log(data)
})



//去掉重复ptf
var readptfsame = async function (arr, callback) {
  let res = [];
  for (let i in arr) {
    if (arr[i].sign == 1) {
      // console.log(arr[i])
    } else {
      let tmp = arr[i].PTFID;
      await  new Promise(function (resolve, reject) {
        setTimeout(function () {
          let sign = 0;
          for (let j in arr) {
            if (tmp == arr[j].PTFID) {
              sign++
              arr[j].sign = 1;
            }
            if (j == (arr.length - 1)) {
              if (sign >= 1) {
                res.push(arr[i]);
              }
              resolve()
            }
          }
        },)
      })
    }
    if (i == (arr.length - 1)) {
      callback(res);
    }
  }
}

exports.controlle = controlle
exports.getHiper = getHiper;
