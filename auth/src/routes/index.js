import { Router } from 'express';
import { 
    userController
 } from '../controllers/index.js';

const router = Router();

router.get('/role', userController.findAllRoles);
router.post('/user', userController.addUser);
router.get('/user', userController.findAllUsers);
router.get('/user/:id', userController.findUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.get('/current-user', userController.findCurrentUser);


export default router;