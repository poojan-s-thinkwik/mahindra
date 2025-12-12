/**
 * Developed By : Ajarudin Gugna
 * Date         : 10-06-22
 * Description  : NODE JS SERVER SCRIPT WORK ON TCP/IP socket
 * amcoderz
*/
var net = require('net');
var server = net.createServer();
const Parser = require('./teltonika-parser-ex');
const util = require('util');
const axios = require('axios');

server.on('connection', handleConnection);

server.listen(4040, function () {
    console.log('server listening to %j', server.address());
});

function handleConnection(conn) {

    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('new client connection from %s', remoteAddress);
    //conn.setEncoding('utf8');
    //548 beacon 
    //https://wiki.teltonika-gps.com/view/FMB130_Beacon_List#Parsing_Advanced_Beacon_data_from_record_.28AVL_ID_548.29
    conn.on('data', onConnData);
    conn.on('close', onConnClose);
    conn.on('error', onConnError);

    function onConnData(d) {
        console.log('connection data from %s:', remoteAddress);
        console.log(d);
        console.log('plain data');
        var hexData = "";
        for (var i = 0; i < d.length; i++) {
            hexData += d2h(d[i]);
        }
        console.log(hexData);
        console.log('HEX data');
        if (hexData.substr(0, 4) == '000F') {
            console.log('login packet.')
            console.log('IMEI : ' + hex2a(hexData.substr(4, 30)));
            conn.clientIMEInumber = hex2a(hexData.substr(4, 30));
            //packet reply
            conn.write(Buffer.alloc(1, 1));
        } else {
            let parser = new Parser(d);
            console.log(parser);
            let avl = parser.getAvl();
            console.log(avl);
            Object.keys(avl.records || {})
            avl.records.forEach(element => {
                console.log(util.inspect(element, false, null, true));
                let beacons = [];
                element.ioElements.forEach(ele => {
                    if (ele.id == 548) {
                        console.log(ele.value);
                        let rec = ele.value.substr(2, ele.value.length).match(/.{1,24}/g);
                        rec.forEach((beacon) => {
                            console.log('Beacons list');
                            console.log(beacon.substr(12, 24));
                            beacons.push(beacon.substr(12, 24))
                        });
                    }
                });
                // Api: https://app.cesano.group/api/hubwithbeacondata
                // See log here: https://app.cesano.group/log_checkApiRequestStoreintolog.txt
                let obj = {
                    "data": {
                        "hub_imei": conn.clientIMEInumber,
                        "gps": element.gps,
                        "beacons": beacons
                    }
                }
                axios.post('https://app.cesano.group/api/hubwithbeacondata', obj)
                    .then(response => {
                        console.log('API called');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
            console.log('############END-END###############');
            //packet reply
            let hexString = avl.number_of_data.toString(16).padStart(8, '0');
            let packetAck = Buffer.from(hexString, 'hex');
            conn.write(packetAck);

            // let writer = new binutils.BinaryWriter();
            // writer.WriteInt32(avl.number_of_data);
            // let response = writer.ByteBuffer;
            // conn.write(response);
        }
    }

    function onConnClose() {
        console.log('connection from %s closed', remoteAddress);
    }

    function onConnError(err) {
        console.log('Connection %s error: %s', remoteAddress, err.message);
    }
    function d2h(s) {
        var a = s.toString(16);
        if ((a.length % 2) > 0) { a = "0" + a; }
        return a.toUpperCase();
    }
    function h2d(s) {
        var a = parseInt(s, 16);
        return a;
    }
    function hex2a(hexx) {
        var hex = hexx.toString();//force conversion
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }
}