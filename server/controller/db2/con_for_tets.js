var Pool = require('ibm_db').Pool;
var pool = new Pool();
var db2 = require(__dirname+'./../../datasources').db2_blue;
let cn = 'DATABASE=' + db2.database +
  ';HOSTNAME=' + db2.hostname +
  ';UID=' + db2.username +
  ';PWD=' + db2.password +
  ';PORT=' + db2.port +
  ';PROTOCOL=TCPIP';
pool.setMaxPoolSize(400);
var log = require('log4js').getLogger('server');

function test() {
  pool.open(cn,function (err,connection){
  if (err) {
    console.log(err);
    return;
  }
  connection.query('select * from "Apar"', function(err1, data) {
    if (err1) {
      console.log(err1);
      return;
    }
    console.log(data);
    connection.close(function(err2) {
      if (err2) console.log(err2);
    });
  });
  })
}
test()


