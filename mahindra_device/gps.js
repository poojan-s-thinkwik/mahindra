/**
 * Developed By : Ajarudin Gugna
 * Date         : 18-06-23
 * Description  : NODE JS SERVER SCRIPT WORK ON TCP/IP socket
 * inofie
*/
var net = require('net');
var server = net.createServer();
const axios = require('axios');

server.on('connection', handleConnection);

server.listen(5050, function () {
    console.log('server listening to %j', server.address());
});

function handleConnection(conn) {

    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('new client connection from %s', remoteAddress);
    //conn.setEncoding('utf8');

    conn.on('data', onConnData);
    conn.on('close', onConnClose);
    conn.on('error', onConnError);

    function onConnData(d) {
        var hexData = "";
        for (var i = 0; i < d.length; i++) {
            hexData += d2h(d[i]);
        }
        console.log('connection data from %s:', remoteAddress);
        console.log(hexData);
        var parsedData = parseData(hexData);
        console.log(parsedData);
        if (parsedData.dataType == 'LINK' || parsedData.dataType == 'LOGIN_REQUEST') {
            let obj = {
                "data": {
                    "gsm_device_id": parsedData.deviceId,
                    "server_time": new Date(),
                    "deviceData": parsedData.data
                }
            }
            axios.post(' https://poplarrpm.com/api/gsmDeviceSaveLatLong', obj)
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            conn.write(d);
        } else if (parsedData.dataType == 'LOCATION'){
            let obj = {
                "data": {
                    "gsm_device_id": parsedData.deviceId,
                    "server_time": new Date(),
                    "deviceData": parsedData.data
                }
            }
            axios.post(' https://poplarrpm.com/api/gsmDeviceSaveLatLong', obj)
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    function parseData(data) {
        data = hex2a(data).slice(1, -1);
        console.log(data);
        let deviceInfor = data.split(',')[0];
        let deviceInforSplitted = deviceInfor.split('*');
        let deviceData = data.split(',')
        let packatData = {}
        let dataType = 'UNKNOWN'
        if (deviceInforSplitted[3] == 'LK') {
            //link data
            dataType = "LINK"
            packatData = {
                steps: deviceData[1],
                rolls: deviceData[2],
                battery: deviceData[3]
            }
        } else if (deviceInforSplitted[3] == 'UD_LTE' || deviceInforSplitted[3] == 'UD2_LTE' || deviceInforSplitted[3] == 'UD' || deviceInforSplitted[3] == 'UD_WCDMA') {
            //location data
            dataType = "LOCATION";
            packatData = {
                "date": deviceData[1],
                "time": deviceData[2],
                "GPSdataEffective": deviceData[3],
                "latitude": deviceData[4],
                "latitudeLogo": deviceData[5],
                "longitude": deviceData[6],
                "longitudeLogo": deviceData[7],
                "speed": deviceData[8],
                "direction": deviceData[9],
                "elevation": deviceData[10],
                "satellitesQuantity": deviceData[11],
                "GSMsignalIntensity": deviceData[12],
                "batterylife": deviceData[13],
                "planTheSteps": deviceData[14],
                "rollsPerformedOnFoot": deviceData[15],
                "trackerState": deviceData[16],
                "quantityOfBaseStation": deviceData[17],
                "linkBaseStation": deviceData[18],
            }

        } else if (deviceInforSplitted[3] == 'TKQ') {
            dataType = "LOGIN_REQUEST";
        }
        let returnData = {
            deviceId: deviceInforSplitted[1],
            dataType: dataType,
            data: packatData
        }
        return returnData;
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
    function hex2a(hexx) {
        var hex = hexx.toString();//force conversion
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }
}