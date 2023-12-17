import Express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';

const router = Express.Router();

router.get('/find/:id', getUser);
router.put('/', updateUser);

export default router;
