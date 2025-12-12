import { Router } from 'express';
import {
    reportController
 } from '../controllers/index.js';

const router = Router();

router.get('/parked', reportController.getParkedReport);
router.get('/idle', reportController.getIdleReport)
router.get('/distance', reportController.getDistanceReport);



export default router;