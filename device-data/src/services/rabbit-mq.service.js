import amqp from 'amqplib';
import { AppLogger } from '../utils/app-logger.js';
import config  from '../config.js';
import ProcessData from './process-data.service.js';
import moment from 'moment';

class RabbitMQ {

    connection;
    channel;
    DEVICE_DATA_QUEUE = "ALL_DEVICE_DATA";

    devices = []

    constructor() {
        this.logger = new AppLogger();
        this.connectRabbitMQ();
        this.processData = new ProcessData();
    }

    connectRabbitMQ = async () => {
        try {
            this.connection = await amqp.connect(config.rabbitmqUrl);
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(this.DEVICE_DATA_QUEUE, { durable: true });
            this.logger.info('RabbitMQ: Connected');
            // await this.channel.purgeQueue(this.DEVICE_DATA_QUEUE);
            this.channel.consume(this.DEVICE_DATA_QUEUE, (message) => {
                if (!JSON.parse(message.content.toString())) {
                    this.logger.error('RabbitMQ: Invalid JSON', message.content.toString());
                    return;
                }
                const data = JSON.parse(message.content.toString());
                const device = this.devices.find(d => d.imei == data.imei);
                if (!device) {
                    // this.logger.error('RabbitMQ: Device not found', data);
                    return;
                }
                
                this.handleData(device, data);

            })
        } catch(err) {
            this.logger.error('RabbitMQ: Connection error', err);
        }
    }

    getConnection = async () => {
        if (this.connection && this.channel) {
            return { connection: this.connection, channel: this.channel };
        } else {
            await this.connectRabbitMQ();
            return { connection: this.connection, channel: this.channel };
        }
    }

    handleData = async (device, data) => {
        try {
            await this.processData.writeData({
                ...device,
                ...data.ioData,
                longitude: data.gpsData.Longitude,
                latitude: data.gpsData.Latitude,
                altitude: data.gpsData.Altitude,
                angle: data.gpsData.Angle,
                satellites: data.gpsData.Satellites,
                speed: data.gpsData.Speed,
                updatedAt: data.updatedAt
            })
        } catch(err) {
            this.logger.error('RabbitMQ: Error handling data', err);
        }
    }
}

export default RabbitMQ;