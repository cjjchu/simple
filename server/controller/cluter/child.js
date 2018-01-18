const util = require('util');
const meplfunction=require('./handle/meplfunction')
process.on('message', function(mes) {
  switch (mes.action) {
    case 'test':
      console.log('[child]:test message ' + mes.context);
      console.log(util.isArray(mes.context));
      break;
    case 'analyze':
      console.log(process.pid+":start analyze.....")
      meplfunction.abalyzehiper(mes.context,function (data) {
        process.send({action:'result',context:data})
      })
  //    process.send({action:'result',context:mes.context})
      break;
    default:console.log('default:'); break;
  }
});

process.on('exit', function(code) {
  console.log('child is  exit' + code);
});

// process.on("disconnect",function () {
//   console.log("disconnection  happen")
// })
