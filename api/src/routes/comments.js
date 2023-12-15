import Express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';

const router = Express.Router();

router.post('/', addComment);
router.get('/', getComments);

export default router;
