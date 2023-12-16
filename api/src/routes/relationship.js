import Express from 'express';
import {
  addRelationship,
  deleteRelationship,
  getRelationship,
} from '../controllers/relationshipController.js';

const router = Express.Router();

router.post('/', addRelationship);
router.get('/', getRelationship);
router.delete('/', deleteRelationship);

export default router;
