var async=require("async")
var arr=new Array(1000);
var arr=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
var coun=0;
// async.eachLimit(arr,100,function (it,callback) {
//   console.log(coun++);
//   process.stdout.write(".");
//   callback()
// },function (err) {
//
// })
//
// if( arr.length>0 ){
//   var a=arr.pop();
//   console.log(a)
//   console.log(coun++)
// }
//
// do{
//   var a=arr.pop();
//   console.log(a)
//   console.log(coun++)
// }while(
//   arr.length>0
//   )
//
// var ars=[1,1]
// ars.push(1,1,1,1)
// console.log(ars)
// console.log(arr.length)
// for(let i in arr){
//   console.log(arr[i])
//   console.log(i)
// }
