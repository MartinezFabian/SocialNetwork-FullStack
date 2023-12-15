import Express from 'express';
import { addLike, deleteLike, getLikes } from '../controllers/likeController.js';

const router = Express.Router();

router.post('/', addLike);
router.get('/', getLikes);
router.delete('/', deleteLike);

export default router;
