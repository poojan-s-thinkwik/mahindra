import Influx from 'influx';
import moment from 'moment';

class ProcessData {

    influx;

    constructor() {
        this.influx = new Influx.InfluxDB({
            host: 'localhost',
            port: 8086,
            username: 'admin',
            password: 'password',
            database: 'mahindra',
            schema: [
                {
                    measurement: 'device_data', // Table-like structure in InfluxDB
                    fields: {

                        mheId: Influx.FieldType.INTEGER,
                        mheName: Influx.FieldType.STRING,
                        deviceId: Influx.FieldType.INTEGER,
                        deviceName: Influx.FieldType.STRING,
                        imei: Influx.FieldType.STRING,
                        warehouseId: Influx.FieldType.INTEGER,

                        ignition: Influx.FieldType.INTEGER,
                        movement: Influx.FieldType.INTEGER,
                        dataMode: Influx.FieldType.INTEGER,
                        GSMSignalStrength: Influx.FieldType.INTEGER,
                        sleepMode: Influx.FieldType.INTEGER,
                        GNSSStatus: Influx.FieldType.INTEGER,
                        PDOP: Influx.FieldType.INTEGER,
                        HDOP: Influx.FieldType.INTEGER,
                        extVoltage: Influx.FieldType.INTEGER,
                        batteryVoltage: Influx.FieldType.INTEGER,
                        batteryCurrent: Influx.FieldType.INTEGER,
                        GSMOperator: Influx.FieldType.INTEGER,
                        tripOdometer: Influx.FieldType.STRING,
                        totalOdometer: Influx.FieldType.STRING,
                        iButton: Influx.FieldType.STRING,
                        forkMovement: Influx.FieldType.INTEGER,
                        sensorLoad: Influx.FieldType.INTEGER,


                        longitude: Influx.FieldType.STRING,
                        latitude: Influx.FieldType.STRING,
                        altitude: Influx.FieldType.STRING,
                        angle: Influx.FieldType.STRING,
                        satellites: Influx.FieldType.STRING,
                        speed: Influx.FieldType.FLOAT,

                        updatedAt: Influx.FieldType.STRING
                    },

                    tags: ['id', 'imei'], // Tags help with indexing
                },
            ],
        })
    }

    writeData = async (data) => {
        try {
            await this.influx.writePoints([{
                measurement: 'device_data',
                tags: {},
                fields: { ...data },
                timestamp: new Date(data.updatedAt.replace(' ', 'T'))
            }])
        } catch (err) {
            console.log(err);
        }
    }
}


export default ProcessData;