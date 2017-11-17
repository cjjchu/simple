const fs = require('fs');

if (process.NODE_ENV === 'development') {
  console.log('runing :' + process.NODE_ENV);
  var context = fs.writeSync('./server/config/log4js.json');
  console.log(context);
} else if (process.NODE_ENV === 'development') {

}
function changeProduction() {
  var data = fs.readFileSync('./server/config/log4js.json', 'utf8');
  var data = JSON.parse(data);
  data.appenders[0].type = 'clustered';
  console.log(JSON.stringify(data));
  fs.writeFileSync('./server/config/log4js.json', JSON.stringify(data));
}
function changeDevelopment() {
  var data = fs.readFileSync('./server/config/log4js.json', 'utf8');
  var data = JSON.parse(data);
  data.appenders[0].type = 'console';
  console.log(JSON.stringify(data));
  fs.writeFileSync('./server/config/log4js.json', JSON.stringify(data));
}

