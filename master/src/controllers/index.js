import { PrismaClient } from '@prisma/client';

import WarehouseRepository from "../repositories/warehouse.repository.js";
import WarehouseService from '../services/warehouse.service.js';
import WarehouseController from "./warehouse.controller.js";

import DeviceRepository from '../repositories/device.repository.js';
import DeviceService from '../services/device.service.js';
import DeviceController from './device.controller.js';

import MheRepository from '../repositories/mhe.repository.js';
import MheService from '../services/mhe.service.js';
import MheController from './mhe.controller.js';
import ClusterRepository from '../repositories/cluster.repository.js';
import ClusterService from '../services/cluster.service.js';
import ClusterController from './cluster.controller.js';

const prisma = new PrismaClient();

const warehouseRepository = new WarehouseRepository(prisma);
const warehouseService = new WarehouseService(warehouseRepository);
export const warehouseController = new WarehouseController(warehouseService);

const deviceRepository = new DeviceRepository(prisma);
const deviceService = new DeviceService(deviceRepository);
export const deviceController = new DeviceController(deviceService);


const mheRepository = new MheRepository(prisma);
const mheService = new MheService(mheRepository);
export const mheController = new MheController(mheService);

const clusterRepository = new ClusterRepository();
const clusterService = new ClusterService(clusterRepository);
export const clusterController = new ClusterController(clusterService);