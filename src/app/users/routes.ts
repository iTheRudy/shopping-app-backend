import express from 'express';
import userController from './controller';

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.get('/', userController.getAllUsers);

export default router;
