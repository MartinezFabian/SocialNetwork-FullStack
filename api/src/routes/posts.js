import Express from 'express';
import { addPost, getPost } from '../controllers/postController.js';

const router = Express.Router();

router.get('/', getPost);
router.post('/', addPost);

export default router;
