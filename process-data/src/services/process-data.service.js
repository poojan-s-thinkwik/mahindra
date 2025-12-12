import Influx from 'influx';
import moment from 'moment';
import pool from '../database/connect.js';

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
                        id: Influx.FieldType.INTEGER, 

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

    logLastRecord = async (time) => {
        try {
            const q = `UPDATE last_record SET log_time = $1;`;
            await pool.query(q, [time]);
        } catch(err) {
            console.log(err);
        }
    }

    getLastRecord = async () => {
        try {
            const q = `SELECT * FROM last_record;`;
            const result = await pool.query(q);
            return result.rows[0].log_time;
        } catch(err) {
            throw err;
        }
    }

    readData = async () => {
        try {
            const mhes = {};
            const influxTime = +(await this.getLastRecord()) + 1e9;
            const results = await this.influx.query(`SELECT mheId, mheName, deviceId, deviceName, imei, ignition, latitude, longitude, forkMovement, sensorLoad, speed, updatedAt FROM device_data WHERE time > ${influxTime} ORDER BY time ASC;`);
            if (!results.length) {
                console.log("No results found");
                return mhes;
            }
            let time = results[results.length - 1].time;
            time = moment(time).valueOf() * 1e6;
            await this.logLastRecord(time);
            results.forEach(d => {
                if (d.mheId && !mhes[d.mheId]) {
                    mhes[d.mheId] = [];
                }
                if (mhes[d.mheId]) {
                    mhes[d.mheId].push({...d, updatedAt: moment(d.updatedAt, 'YYYY-MM-DD HH:mm:ss')});
                }
            });
            return mhes;
        } catch(err) {
            console.log(err);
        }
    }
}


export default ProcessData;