import Express from 'express';
import { addComment, getComments, deleteComment } from '../controllers/commentController.js';

const router = Express.Router();

router.post('/', addComment);
router.get('/', getComments);
router.delete('/:id', deleteComment);

export default router;
