/**
 * Developed By : Ajarudin Gugna
 * Date         : 10-06-22
 * Description  : NODE JS SERVER SCRIPT WORK ON TCP/IP socket
 */
const {
  ProtocolParser,
  parseIMEI,
  Data,
  GPRS,
} = require("./TeltonikaParser-master/build/Scripts/ProtocolParser");
var net = require("net");
var mysql = require("mysql2");
var server = net.createServer();
const Parser = require("./teltonika-parser");
const binutils = require("binutils64");

var moment = require("moment");
var pool = mysql.createPool({
  connectionLimit: 100000, //important
  host: "gentrax-db-rds.c9k0eqyyasb5.ap-south-1.rds.amazonaws.com",
  port: "3306",
  user: "root",
  password: "gentraxadmin24",
  database: "one_mahindra",
});

server.on("connection", handleConnection);

server.listen(3030, function () {
  console.log("server listening to %j", server.address());
});

function handleConnection(conn) {
  var remoteAddress = conn.remoteAddress + ":" + conn.remotePort;
  console.log("new client connection from %s", remoteAddress);
  //conn.setEncoding('utf8');

  conn.on("data", onConnData);
  conn.on("close", onConnClose);
  conn.on("error", onConnError);

  function onConnData(d) {
    console.log("d", d);
    var hexData = "";
    for (var i = 0; i < d.length; i++) {
        hexData += d2h(d[i]);
    }
    console.log("connection data from %s:", remoteAddress);
    console.log("hexData", hexData);
    if (hexData.substr(0, 4) == "000F") {
      console.log("login packet.");
      console.log("IMEI : " + hex2a(hexData.substr(4, 30)));
      conn.clientIMEInumber = hex2a(hexData.substr(4, 30));
      //packet reply
      conn.write(Buffer.alloc(1, 1));
    } else {
      let parsed = new ProtocolParser(hexData);
      let parser = new Parser(d);
      let avl = parser.getAvl();
      if (parsed.Content.AVL_Datas) {
        if (typeof conn.clientIMEInumber !== "undefined") {
          pool.getConnection(function (err, connection) {
            if (err) {
              console.log(err);
              connection.release();
            }
            var avlparsed = parsed.Content.AVL_Datas;
            Object.keys(avlparsed || {});
            avlparsed.forEach((element) => {
              // console.log('element', element);
              let ioElements = element.IOelement.Elements;
              let ioRecord = {
                ignition: "",
                movement: "",
                dataMode: "",
                GSMSignalStrength: "",
                sleepMode: "",
                GNSSStatus: "",
                PDOP: "",
                HDOP: "",
                extVoltage: "",
                batteryVoltage: "",
                batteryCurrent: "",
                GSMOperator: "",
                tripOdometer: "",
                totalOdometer: "",
                iButton: "",
                forkMovement: "",
                senssorLoad: ""
              };
              if(conn.clientIMEInumber == '350612078287842'){
                console.log('element', element);
                console.log('ioElements', conn.clientIMEInumber, ioElements);
              }
              Object.keys(ioElements).forEach(function (key) {
                switch (key) {
                  case "3":
                    ioRecord.ignition = ioElements[key];
                    break;
                  case "240":
                    ioRecord.movement = ioElements[key];
                    break;
                  case "80":
                    ioRecord.dataMode = ioElements[key];
                    break;
                  case "21":
                    ioRecord.GSMSignalStrength = ioElements[key];
                    break;
                  case "200":
                    ioRecord.sleepMode = ioElements[key];
                    break;
                  case "69":
                    ioRecord.GNSSStatus = ioElements[key];
                    break;
                  case "181":
                    ioRecord.PDOP = ioElements[key];
                    break;
                  case "182":
                    ioRecord.HDOP = ioElements[key];
                    break;
                  case "66":
                    ioRecord.extVoltage = ioElements[key];
                    break;
                  case "67":
                    ioRecord.batteryVoltage = ioElements[key];
                    break;
                  case "68":
                    ioRecord.batteryCurrent = ioElements[key];
                    break;
                  case "241":
                    ioRecord.GSMOperator = ioElements[key];
                    break;
                  case "199":
                    ioRecord.tripOdometer = ioElements[key];
                    break;
                  case "16":
                    ioRecord.totalOdometer = ioElements[key];
                    break;
                  case "78":
                    ioRecord.iButton = d2h(Number(ioElements[key]));
                    break;

                  case "9":
                    ioRecord.forkMovement = ioElements[key];
                    break;
                  case "6":
                    ioRecord.senssorLoad = ioElements[key];
                    break;

                  default:
                    break;
                }
              });
              let gpsdata = element.GPSelement;
              let updated_at = formatDate(element.Timestamp);
              var sqlQuery =
                "INSERT INTO `LocationStatus` (`id`,`imei` , `latitude` , `longitude` ,`speed`, `cource` ,`ignition`, `movement`, `dataMode`, `GSMSignalStrength`, `sleepMode`, `GNSSStatus`, `PDOP`, `HDOP`, `extVoltage`, `batteryVoltage`, `batteryCurrent`, `GSMOperator`, `iButton`, `serverDatetime`, `forkMovement`, `senssorLoad`)" +
                "VALUES ( NUll ,'" +
                conn.clientIMEInumber +
                "','" +
                gpsdata.Latitude +
                "','" +
                gpsdata.Longitude +
                "','" +
                gpsdata.Speed +
                "','" +
                gpsdata.Angle +
                "','" +
                ioRecord.ignition +
                "','" +
                ioRecord.movement +
                "','" +
                ioRecord.dataMode +
                "','" +
                ioRecord.GSMSignalStrength +
                "','" +
                ioRecord.sleepMode +
                "','" +
                ioRecord.GNSSStatus +
                "','" +
                ioRecord.PDOP +
                "','" +
                ioRecord.HDOP +
                "','" +
                ioRecord.extVoltage +
                "','" +
                ioRecord.batteryVoltage +
                "','" +
                ioRecord.batteryCurrent +
                "','" +
                ioRecord.GSMOperator +
                "','" +
                ioRecord.iButton +
                "', '" +
                updated_at +
                "', '" +
                ioRecord.forkMovement +
                "', '" +
                ioRecord.senssorLoad +
                "')";
              console.log(sqlQuery);
              connection.query(sqlQuery, function (err, result) {
                if (err) throw err;
                console.log("Location data Stored!!");
              });

              //update in logindata
              var sqlQueryUpdate =
                "UPDATE `loginData` SET `latitude`='" +
                gpsdata.Latitude +
                "',`longitude`='" +
                gpsdata.Longitude +
                "',`speed`='" +
                gpsdata.Speed +
                "',`cource`='" +
                gpsdata.Angle +
                "',`ignition` ='" +
                ioRecord.ignition +
                "',`movement`='" +
                ioRecord.movement +
                "',`dataMode`='" +
                ioRecord.dataMode +
                "',`GSMSignalStrength`='" +
                ioRecord.GSMSignalStrength +
                "',`sleepMode`='" +
                ioRecord.sleepMode +
                "',`GNSSStatus`='" +
                ioRecord.GNSSStatus +
                "',`PDOP`='" +
                ioRecord.PDOP +
                "',`HDOP`='" +
                ioRecord.HDOP +
                "',`extVoltage`='" +
                ioRecord.extVoltage +
                "',`batteryVoltage`='" +
                ioRecord.batteryVoltage +
                "',`batteryCurrent`='" +
                ioRecord.batteryCurrent +
                "',`GSMOperator`='" +
                ioRecord.GSMOperator +
                "',`iButton`='" +
                ioRecord.iButton +
                "',`integrate`='1', `updated_at` = '"+ updated_at +"', `forkMovement` = '"+ ioRecord.forkMovement +"', `senssorLoad` = '"+ ioRecord.senssorLoad +"' WHERE `imei` = " +
                conn.clientIMEInumber;
              console.log(sqlQueryUpdate);
              const checkUpdatedAtSqlQuery = "SELECT `updated_at` FROM `loginData` WHERE `imei` = ?";
              connection.query(checkUpdatedAtSqlQuery, [conn.clientIMEInumber], (err, result) => {
                if (err) throw err;
                const date1 = new Date(result[0].updated_at); // Comming from loginData table (updated_at)
                const date2 = new Date(updated_at); // Comming  from device
                if(date2.getTime() > date1.getTime()){
                  connection.query(sqlQueryUpdate, function (err, result) {
                    if (err) throw err;
                    console.log("Logindata data Updated!!");
                  });
                }
              });
              if (ioRecord.iButton != "") {
                var punchSQL =
                  "INSERT INTO `employ_punch_log`(`employ_punch_log_id`, `punch_id`, `imei_number`, `latitude`, `longitude`) VALUES (NULL,'" +
                  ioRecord.iButton +
                  "','" +
                  conn.clientIMEInumber +
                  "','" +
                  gpsdata.Latitude +
                  "','" +
                  gpsdata.Longitude +
                  "')";
                console.log(punchSQL);
                connection.query(punchSQL, function (err, result) {
                  if (err) throw err;
                  console.log("Punch data stored!!");
                });
              }
            });

            connection.release();
          });
        } else {
          console.log("IMEI undefine !!");
        }
      }
      let writer = new binutils.BinaryWriter();
      writer.WriteInt32(avl.number_of_data);
      let response = writer.ByteBuffer;
      conn.write(response);
    }
  }

  function onConnClose() {
    console.log("connection from %s closed", remoteAddress);
  }

  function onConnError(err) {
    console.log("Connection %s error: %s", remoteAddress, err.message);
  }
  function d2h(s) {
    var a = s.toString(16);
    if (a.length % 2 > 0) {
      a = "0" + a;
    }
    return a.toUpperCase();
  }
  function hex2a(hexx) {
    var hex = hexx.toString(); //force conversion
    var str = "";
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  function h2d(hexString){
    let str = hexString.toString(); //force conversion
    const decimalValue = parseInt(str, 16);
    return decimalValue;
  }

  function formatDate(date) {
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

}
