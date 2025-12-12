var net = require('net');
var mysql = require('mysql2');
var server = net.createServer();

var moment = require('moment');
var pool = mysql.createPool({
    connectionLimit: 100000, //important
    host: "35.154.89.77",
    port: "3306",
    user: "nexus_cloud",
    password: "Nexus@123",
    database: "gentrax_onetouch_updated"
});

server.on('connection', handleConnection);

server.listen(4040, function () {
    console.log('server listening to %j', server.address());
});

function handleConnection(conn) {

    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('new client connection from %s', remoteAddress);

    conn.on('data', onConnData);
    conn.on('close', onConnClose);
    conn.on('error', onConnError);

    function onConnData(d) {

        var hexData = "";

        let x = ['78','78','','22','18','01','1b','07','3b','19','cc','02','78','09','22','07','c7','91','ff','16','15','60','00','00','00','00','00','00','00','00','01','00','01','00','05','78','41','00','04','c8','d5','0d','0a'];

        for (var i = 0; i < x.length; i++) {
            hexData += x[i];
        }

        console.log('connection data from %s:', remoteAddress);
        console.log(`hexdata`, hexData);

        if (hexData.substr(0, 2) == '78') {
            console.log('login packet.')
            console.log('Date Time : ' + hexData.substr(4, 12));
            console.log('Latitude : ' + hexData.substr(16, 20));
            //packet reply
            conn.write(Buffer.alloc(1, 1));
        } else {

        }
    }

    function onConnClose() {
        console.log('connection from %s closed', remoteAddress);
    }

    function onConnError(err) {
        console.log('Connection %s error: %s', remoteAddress, err.message);
    }

    function getLatitude(str){

    }

}