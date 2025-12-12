import { Router } from 'express';
import { 
    warehouseController,
    deviceController,
    mheController,
    clusterController
 } from '../controllers/index.js';

const router = Router();

router.get('/state', warehouseController.findAllStates);
router.post('/warehouse', warehouseController.createWarehouse);
router.get('/warehouse', warehouseController.findAllWarehouse);
router.get('/warehouse/:id', warehouseController.findWarehouse);
router.put('/warehouse/:id', warehouseController.updateWarehouse);
router.post('/shift', warehouseController.createShift);
router.get('/shift', warehouseController.findAllShift);
router.get('/shift/:id', warehouseController.findShift);
router.put('/shift/:id', warehouseController.updateShift);
router.delete('/shift/:id', warehouseController.deleteShift);

router.post('/device-type', deviceController.createDeviceType);
router.get('/device-type', deviceController.findAllDeviceTypes);
router.post('/device', deviceController.createDevice);
router.get('/device', deviceController.findAllDevices);

router.post('/mhe', mheController.createMhe);
router.get('/mhe', mheController.findAllMhe);
router.get('/mhe/:id', mheController.findMhe);
router.put('/mhe/:id', mheController.updateMhe);
router.delete('/mhe/:id', mheController.deleteMhe);

router.post('/cluster', clusterController.createCluster);
router.get('/cluster', clusterController.findAllClusters);


export default router;