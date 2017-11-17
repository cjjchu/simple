var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/simple'; // # 数据库为 runoob

// var insertData = function(db, callback) {
//
//   var collection = db.collection('site');
//   //插入数据
//   var data = [{"name":"菜鸟教程","url":"www.runoob.com"},{"name":"菜鸟工具","url":"c.runoob.com"}];
//   collection.insert(data, function(err, result) {
//     if(err)
//     {
//       console.log('Error:'+ err);
//       return;
//     }
//     callback(result);
//   });
// }
MongoClient.connect(DB_CONN_STR, function(err, con) {
  con.collection('my').insert([{name: 'mjscjj'}], function(err, result) {
    console.log(err, result);
  });
});

MongoClient.connect(DB_CONN_STR, function(err, conn) {
  conn.collection('my').find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
});



//
// MongoClient.connect(DB_CONN_STR, function(err, db) {
//   console.log("连接成功！");
//   insertData(db, function(result) {
//     console.log(result);
//     db.close();
//   });
// });
