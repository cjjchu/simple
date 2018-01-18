var Client = require('ftp');
let async = require('async');
var fs = require('fs');
var analyzemeplByFile = require('../analyzemepl/styleOne').analyzemeplByFile;
const db2 = require('../db2/db2pool');
const zconfig = require('../../config/zConfig').zconfig;

/**
 *
 * @param filename
 * @param callbackall
 */
function downloadFileFromFTP(filename, saveName, server, callbackall) {
  server.get(filename, function(err, stream) {
    if (err) {
      console.error(err);
      callbackall('pmr FTP err:' + err);
      return;
    }
    stream.once('close', function() {
      callbackall(null, saveName);
    });
    stream.pipe(fs.createWriteStream(__dirname+'/data/' + saveName));
  });
}

/**
 *
 * @param pmrName  exp:90015,124,672
 * @param callbackall function (err,files)
 * @return a meplfile array
 */
function getMeplNameFromPmr(pmrName, callbackall) {
  let c = new Client();
  let fileNames = [];
  let cwdFiles=[];
  if (pmrName.length != 13) {
    callbackall('Illegal pmrid!');
    return;
  }
  // console.log(pmrName);
  c.connect({
    host: zconfig.pmrServer.host, user: zconfig.pmrServer.user, password: zconfig.pmrServer.password,
    secure: true,
    secureOptions: {rejectUnauthorized: false},
  });
  c.on('ready', function() {
    console.log('ftp server connect cuccess');
    /////[ '0-all_data', '2017-12-17', '2017-12-18', '2017-12-26', 'tmp' ]
    paths = '../../../../../../../../../ecurep/pmr' + '/' + pmrName[0] + '/' + pmrName[1] + '/' + pmrName + '/' + '0-all_data/';
    console.log('path:' + paths);
    c.cwd(paths, function(err, res) {
      if (err) {
        // console.error(err);
        callbackall('No information was found on the pmrid:' + pmrName);
        c.end();
        return;
      }
      c.list(function(err, list) {
        if (err) {
          console.error(err);
          callbackall('FTP error:' + err);
          c.end();
          return;
        }
        list.forEach(function(eles) {
          if (eles.type === '-') {
            let modulereq = /\.MEPL/g;
            let modulereq2 = /\.mepl/g;
            if (modulereq.test(eles.name) || modulereq2.test(eles.name)) {
              fileNames.push({
                'name': eles.name,
                'data': eles.date,
                'path_name': paths + eles.name,
              });
            }
          }else if(eles.type==='d'){
            cwdFiles.push(eles.name)
          }
        });
        // if(cwdFiles.length>0){
        //   c.cwd('./'+cwdFiles.pop(),function (err,da) {
        //     c.list(function (err,l4) {
        //       l4.forEach(function (e5) {
        //         if (e5.type === '-') {
        //           let modulereq = /\.MEPL/g;
        //           let modulereq2 = /\.mepl/g;
        //           if (modulereq.test(e5.name) || modulereq2.test(e5.name)) {
        //             fileNames.push({
        //               'name': e5.name,
        //               'data': e5.date,
        //               'path_name': paths + e5.name,
        //             });
        //           }
        //         }
        //       })
        //     })
        //   })
        // }
        // console.log(3)
        // c.pwd(function (e,d) {
        //   console.log(d)
        // })
        // async.mapLimit(cwdFiles, 1, function (it1, callback1) {
        //    console.log(it1)
        //   c.cwd('../'+it1,function (err,da) {
        //     c.list(function (err,l4) {
        //       l4.forEach(function (e5) {
        //         if (e5.type === '-') {
        //           let modulereq = /\.MEPL/g;
        //           let modulereq2 = /\.mepl/g;
        //           if (modulereq.test(e5.name) || modulereq2.test(e5.name)) {
        //             console.log(e5)
        //             fileNames.push({
        //               'name': e5.name,
        //               'data': e5.date,
        //               'path_name': paths + e5.name,
        //             });
        //           }
        //         }
        //       })
        //       callback1(null,'1')
        //     })
        //   })
        // }, function (err, relationsall) {
        //   console.log("end")
        //   console.log(fileNames)
        // });

        if (fileNames == null||fileNames.length<1) {
          callbackall('No mepl file in FTP server');
          c.end();
        } else {
          callbackall(null, fileNames);
          c.end();
        }
      });
    });
  });

  c.on('end', function() {
    console.log('ftp connection close');
  });
}


// function traverse(client,fileNames) {
//     client.list(function(err, list) {
//       if (err) {
//         console.error(err);
//         callbackall('FTP error:' + err);
//         c.end();
//         return;
//       }
//       list.forEach(function(eles) {
//         console.log("trave:"+eles.type)
//         if (eles.type === '-') {
//           let modulereq = /\.MEPL/g;
//           let modulereq2 = /\.mepl/g;
//           if (modulereq.test(eles.name) || modulereq2.test(eles.name)) {
//             fileNames.push({
//               'name': eles.name,
//               'data': eles.date,
//               'path_name': paths + eles.name,
//             });
//           }
//         }else if(eles.type='d'){
//           console.log("in")
//           client.cwd('./'+eles.name,function (err,dt) {
//             traverse(client,fileNames)
//           })
//         }
//       });
//     });
// }
/**
 *
 * @param files:a array of file infomation exp:
 * {
 * name: '90015.124.672.PROXY.PS0A.D171218.MEPL',
    data: 2017-12-18T01:24:00.000Z,
    path_name: '../../../../../../../../../ecurep/pmr/9/0/90015,124,672/0-all_data/90015.124.672.PROXY.PS0A.D171218.MEPL'
    }
 * @param callbackall function (err:err,meplID:meplids )
 * @constructor
 */
function DownMeplUpdataDb(files, callbackall) {
  let c = new Client();
  c.connect({
    host: zconfig.pmrServer.host, user: zconfig.pmrServer.user, password: zconfig.pmrServer.password,
    secure: true,
    secureOptions: {rejectUnauthorized: false},
  });
  c.on('ready', function() {
    console.log('ftp2 connection success');
    downloadFileFromFTP(files.path_name, files.name, c, function(err, fname) {
      if(err){
        callbackall("No this mepl file in FTP server")
        return
      }
      console.log(fname);
      db2.pool.open(db2.cn, function(err, conn) {
        if (err) {
          console.log('========db2   connect  error========' + err);
          return;
        }
        console.log('db2 open success');
        analyzemeplByFile("./server/controller/pmrData/data/"+fname, function(err, data) {
          if(err){
            callbackall('This is not a typical mepl file')
            return
          }
          if(data.length<1){
            callbackall('This is not a typical mepl file')
            return
          }
          // console.log(data);
          conn.query('select max(meplid) as MX from meplitems_t', function(err, id) {

            if (id == null || id[0] == null) {
              id[0] = 1;
            }
            let meplidinit = id[0].MX + Math.ceil(Math.random() * 5);
            let sql = joinString(data, meplidinit);
            // console.log(sql)
            conn.query(sql, function(err, data) {
              fs.appendFile(__dirname+'/meplid.json',',{"MEPLID":'+meplidinit+'}',function (err,data) {

              })
              fs.appendFile(__dirname+'/history.json', '\nOperate Time:' + new Date().toDateString() + ' ' + new Date().toLocaleTimeString() + ' meplid:' + meplidinit + '\nsql:' + sql, function(err, data) {
              });
              if (err) {
                console.error(err);
                return;
              }
              console.log('=================  insert success  ===================');
              meplres={}
              meplres.meplid=meplidinit;
              callbackall(null, meplres);
              c.end();
              conn.close();
            });
          });
        });
      });
    });
  });

  c.on('end', function() {
    console.log('ftp2 connection close');
  });
}

function joinString(mp, meplid) {
  let res = 'insert into meplitems_t (meplid,ldmod,module,ptfid) values ';
  mp.forEach(function(ele) {
    if (ele.PTFID == null) {
      res += '(' + meplid + ',\'' + '0' + '\',\'' + ele.MODULE + '\',\'' + '\'),';
    } else {
      res += '(' + meplid + ',\'' + '0' + '\',\'' + ele.MODULE + '\',\'' + ele.PTFID + '\'),';
    }
  });
  return res.slice(0, res.length - 1);
}

// getMeplNameFromPmr('90015,124,672', function(err, res) {
//   if (err) {
//     console.error('file err:' + err);
//     return;
//   }
//   console.log(res);
//   // DownMeplUpdataDb(res[0], function (err, data) {
//   //   if (err) {
//   //     console.log(err);
//   //     return;
//   //   }
//   //   console.log(data);
//   // });
// });
    ////////              90015,124,672  90014,124,672
//

exports.getMeplNameFromPmr = getMeplNameFromPmr;
exports.DownMeplUpdataDb = DownMeplUpdataDb;
