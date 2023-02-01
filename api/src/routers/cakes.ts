import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import {
  allCakes,
  createCake,
  deleteCake,
  findCakeById,
  updateCake,
} from '../controller/cakes';

const router = express.Router();

// without login
router.get('/', allCakes);

// login required
router.get('/:cakeId', authMiddleware, findCakeById);

// for Admin
router.delete('/:cakeId', authMiddleware, adminMiddleware, deleteCake);
router.post('/', authMiddleware, adminMiddleware, createCake);
router.post('/:cakeId', authMiddleware, adminMiddleware, updateCake);

export default router;
