var ibmdb = require("ibm_db")
    , connStr = "DATABASE=simpledb;HOSTNAME=9.111.212.250;PORT=50000;PROTOCOL=TCPIP;UID=cdladmin;PWD=IBM22ibm";

ibmdb.open(connStr, function (err, connection) {
    if (err)
    {
        console.log(err);
        return;
    }
    console.log(connection)
    connection.query("select * from PE_A", function (err1, rows) {
        if (err1) console.log(err1);
        else console.log(rows);
        connection.close(function(err2) {
            if(err2) console.log(err2);
        });
    });
});
//连接DB2    https://github.com/ibmdb/node-ibm_db