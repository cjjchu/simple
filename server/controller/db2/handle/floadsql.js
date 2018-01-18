'use strict'
var ibmdb = require('ibm_db'),
  connStr = 'DATABASE=simpledb;HOSTNAME=9.111.212.250;PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm';

ibmdb.open(connStr, function(err, connection) {
  if (err) {
    console.log(err);
    return;
  }





var fs = require('fs');

var out = fs.createWriteStream('./message.txt');
out.on('error',function(err){
  console.log('写文件操作失败，错误信息为：' + err.message);
  process.exit();
})
    console.log('与mysql数据库建立连接成功');
    var query = connection.query('select * from admin');
    //当接收数据的过程中产生错误时触发
    query.on('error',function(err){
      console.log('读取数据失败，错误信息为：' + err.message);
      process.exit();
    })
    //fields当接收到该表中的所有字段时触发
      .on('fields',function(fields){
        var str = "";
        fields.forEach(function(field){
          if(str != ""){
            //String.fromCharCode()表示将Unicode字符值转换为相应的字符串，这里的9表示一个制表符
            str += String.fromCharCode(9);
          }
          str += field.name;
        })
        out.write(str + '\r\n');
      })
      //result当接收到该表中的一条数据时触发
      .on('result',function(row){
        //暂停读取后续数据
        connection.pause();
        out.write(row.id + String.fromCharCode(9) + row.username + String.fromCharCode(9) + row.password + '\r\n',function(err){
          //恢复读取后续数据
          connection.resume();
        })
      })
      //end当接收完该表中的所有数据时触发
      .on('end',function(){
        console.log('数据全部写入完毕');
        connection.end();
      })

});
