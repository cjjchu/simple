const db2 = require('../db2/db2pool');
const getmepls = require('./getmepls');
const getmeplitems = require('./getmeplitems').getmeplitems;
const getrelationsnoptf = require('./getrelations').getrelationsnoptfid;
const async = require('async');
var fs = require('fs')

function controlle(meplid, release, calllbackall) {
  console.time("spend time:")
  getmeplitems(meplid, function (meplitems) {
    fs.writeFile('./meplitems.json', JSON.stringify(meplitems), function (err, data) {
    })
    // meplitems = meplitems.slice(1, 1000);
    let resuarr = [];
    async.mapLimit(meplitems, 20, function (it1, callback1) {
      getrelationsnoptf(it1.MODULE, it1.PTFID, release, function (relations) {
        if (relations != null) {
          process.stdout.write('.')
          resuarr.push(...relations)
          callback1();
        } else {
          callback1();
        }
      });
    }, function (err, relationsall) {
      if (err) {
        console.log(err);
        return
      }
      console.log()
      console.timeEnd("spend time:")
      calllbackall(resuarr)
    });
  });
}


// userID: 'AVMEV2672'
// meplID: '5877'
// subSys: '123'
// release: 'A'
// subRelease: '1'
controlle('5816', 'B', function (data) {
  console.log('result length:' + data.length)

  fs.writeFile('./sameptfresult.json', JSON.stringify(data), function (err, data) {
  })
  readptfsame(data, function (data1) {
    fs.writeFile('./ptf.json', JSON.stringify(data1), function (err, data) {
    })
    console.log(data1.length)
  })
});

async function handleptf(arr,callbackall) {
  let  res=[];
  // for(let i in arr ){
  //   if(arr[i])
  //
  // }


}



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

exports.controlle=controlle
