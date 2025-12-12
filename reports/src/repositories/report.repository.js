import Influx from 'influx';

class ReportRepository {

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

    getDataByMhe = async ({mheId, startDate, endDate}) => {
        const q = `SELECT * FROM device_data WHERE mheId = ${mheId} AND time >= ${startDate} AND time <= ${endDate} ORDER BY time`;
        const results = await this.influx.query(q);
        return results;  
    }

}

export default ReportRepository;