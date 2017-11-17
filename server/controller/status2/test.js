const fs = require('fs');
//
// function ini() {
//   let data = fs.readFileSync('./meplitems.json');
//   let data2 = fs.readFileSync('./mdptf.json');
//   let no = JSON.parse(data2);
//   let java = JSON.parse(data);
//
//   java.forEach(function(element, index, arr) {
//     no.forEach(function(ele, ind, ar) {
//       if (element.sign == null) {
//         if (element.MODULE == ele.MODULE) {
//           element.sign = 1;
//         }
//       }
//     });
//   });
//
//   let coun = 0;
//   java.forEach(function(element, index, arr) {
//     if (element.sign == null) {
//       console.log(element);
//       console.log(coun++);
//     }
//   });
// }
//
// // ini()
//
// let data = fs.readFileSync('./meplitems.json');
// data = JSON.parse(data);
// console.log(data.length)
// let data2 = fs.readFileSync('./mdptf.json');
// data2=JSON.parse(data2)
// console.log(data2.length)
//
//
//
//
// function deleSame(ar) {
//   let resu = [];
//   ar.forEach(function(ele) {
//     if (ele.s == null) {
//       resu.push(ele);
//       ar.forEach(function(elem) {
//         if (ele.MODULE == elem.MODULE) {
//           elem.s = 1;
//         }
//       });
//     }
//   });
//   return resu;
// }
//
//
// let r=deleSame(data);
// console.log(r.length)
// let r2=deleSame(data2);
// console.log(r2.length)
//
//
// r.forEach(function(element, index, arr) {
//   if (element.sign == null) {
//     r2.forEach(function(ele, ind, ar) {
//       if (element.MODULE== ele.MODULE) {
//         element.sign=1;
//       }
//     });
//   }
// });
//
// let coun = 0;
// r.forEach(function(element) {
//   if (element.sign == null) {
//     console.log(element);
//     console.log(coun++);
//   }
// });
// console.log(r)

let st = 'PI85715';
let reg=/[\s\[\]]/g;
// let reg = /[\s\[\],:\.\*"]/g;
let res1 = st.replace(reg, '');
console.log(res1)
