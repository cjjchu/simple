// var Client = require('ftp');
// var fs = require('fs');
// var c = new Client();
//
// // c.on('greeting',function (msg) {
// //   console.log(msg)
// // })
// //
// // c.on('ready', function() {
// //   c.list(function(err, list) {
// //     if (err) throw err;
// //    // console.dir(list);
// //     console.log(list);
// //     c.get('README', function(err, stream) {
// //       if (err) { console.log(err); return; }
// //       stream.once('close', function() {
// //         c.end();
// //       });
// //       stream.pipe(fs.createWriteStream('./readme.txt'));
// //     });
// //   });
// // });
// // connect to localhost:21 as anonymous
// c.connect({host: 'testcase.software.ibm.com'});
//
// c.on('ready', function() {
//   c.list(function(err, list) {
//   // console.log(list);
//   });
//   c.pwd(function(err, msg) {
//     console.log('currdir:' + msg);
//   });
//   c.system(function(err, os) {
//     console.log('os:' + os);
//   });
//   c.cwd('/fromibm', function(err, curr) {
//     c.list(function(err, list) {
//       console.log(list);
//     });
//   });
//
//   setTimeout(function() {
//     c.end();
//   }, 3000);
// });
//
