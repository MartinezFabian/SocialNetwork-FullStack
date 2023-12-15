import Express from 'express';
import { addPost, getPost } from '../controllers/postController.js';

const router = Express.Router();

router.post('/', addPost);
router.get('/', getPost);

export default router;
