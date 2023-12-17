import Express from 'express';
import { addPost, getPost, deletePost } from '../controllers/postController.js';

const router = Express.Router();

router.post('/', addPost);
router.get('/', getPost);
router.delete('/:id', deletePost);

export default router;
