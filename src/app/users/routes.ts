import express from 'express';
import userController from './controller';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/create', userController.createUser);
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;
