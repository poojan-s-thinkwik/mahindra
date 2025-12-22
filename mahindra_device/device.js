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
const amqp = require("amqplib");
var server = net.createServer();
const Parser = require("./teltonika-parser");
const binutils = require("binutils64");

var moment = require("moment");

// RabbitMQ Connection Setup
let channel = null;
const QUEUE_NAME = "ALL_DEVICE_DATA";
const RABBITMQ_URL = "amqp://user:password@localhost:5672";

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    setTimeout(connectRabbitMQ, 5000);
  }
}

connectRabbitMQ();

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
              sensorLoad: ""
            };
            if (conn.clientIMEInumber == '350612078287842') {
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
                  ioRecord.sensorLoad = ioElements[key];
                  break;

                default:
                  break;
              }
            });
            let gpsdata = element.GPSelement;
            let updated_at = formatDate(element.Timestamp);

            // Construct payload for RabbitMQ
            const payload = {
              imei: conn.clientIMEInumber,
              ioData: ioRecord, // device-data consumer expects 'ioData' spread into the object
              gpsData: {
                Latitude: gpsdata.Latitude,
                Longitude: gpsdata.Longitude,
                Speed: gpsdata.Speed,
                Angle: gpsdata.Angle,
                Altitude: gpsdata.Altitude, // Assuming parser provides this or it's missing (Checked device-data needs it but original MySQL insert didn't use it. Adding if available or safely ignoring)
                Satellites: gpsdata.Satellites // Same as above
              },
              updatedAt: updated_at
            };

            if (channel) {
              channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)));
            } else {
              console.error("RabbitMQ channel not available");
            }

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

  function h2d(hexString) {
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

