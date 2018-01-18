// var fs = require("fs")
// var path = require("path")
//
// var root = path.join(__dirname)
// console.log(root)
// console.log(__dirname)
// readDirSync(root)
// function readDirSync(path){
//   var pa = fs.readdirSync(path);
//   pa.forEach(function(ele,index){
//     var info = fs.statSync(path+"/"+ele)
//     if(info.isDirectory()){
//       console.log("dir: "+ele)
//       readDirSync(path+"/"+ele);
//     }else{
//       console.log("file: "+ele)
//     }
//   })
// }
// console.log('1')
// readDirSync('../')
// // console.log('2')
// while(true){
//   if(1>2){
//
//   }
//   // console.log("1")
// }
c=[]
c.push(1)
c.push(2)
c.push(3)
console.log(c)
c.pop()
console.log(c)
