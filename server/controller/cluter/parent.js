var http = require('http');
var cp = require('child_process');
var express = require('express');
var mepl = require('./handle/getmeplitems');
var child1 = cp.fork(__dirname + '/child.js');
var child2 = cp.fork(__dirname + '/child.js');
var child3 = cp.fork(__dirname + '/child.js');


var server = http.createServer(function (req, res) {
  let meplid = '4723';
  let release = 'A';

  mepl.getmeplitems(meplid, function (data0) {
    console.log("get mepl" + data0.length);
    let data1 = data0.slice(0, 1000);
    let data2 = data0.slice(1000, 2000)
    let data3 = data0.slice(2000, 3000)

    child1.send({action: 'analyze', context: data1});
    child2.send({action: 'analyze', context: data2});
    child3.send({action: 'analyze', context: data3});
  });

  child1.on('message', function (mes) {
    console.time('child1all')
    switch (mes.action) {
      case 'result':
        console.log('result1:' + mes.context.length);
        //    console.log(mes.context)
        console.timeEnd('child1all')
        break;
      default:
    }
  })

  child2.on('message', function (mes) {
    console.time('child2all')
    switch (mes.action) {
      case 'result':
        console.log('result2:' + mes.context.length);
        //  console.log(mes.context)
        console.timeEnd('child2all')
        break;
      default:
    }
  });

  child3.on('message', function (mes) {
    console.time('child3all')
    switch (mes.action) {
      case 'result':
        console.log('result3:' + mes.context.length);
        //  console.log(mes.context)
        console.timeEnd('child3all')
        break;
      default:
    }
  });


  // child1.send({action: 'test', context: [1, 1, 1, 1, 1, 1]});
});


server.listen(3000, function () {
  console.log('success 3000');
});

/*
* 进程间消息通信机制:
* 1组成:分为action和context两个部分
* 2action种类:
* test:
* init,.
* 3contex
*
*
*
* */
