import Express from 'express';
import { getUser, getUsers, updateUser } from '../controllers/userController.js';

const router = Express.Router();

router.get('/all', getUsers);
router.get('/find/:id', getUser);
router.put('/', updateUser);

export default router;
