import Express from 'express';
import { getUser } from '../controllers/userController.js';

const router = Express.Router();

router.get('/find/:id', getUser);

export default router;
