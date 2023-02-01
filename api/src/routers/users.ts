import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import {
    allUsers,
    findUserById,
    deleteUser,
    createUser,
    updateUser,
} from '../controller/users';

const router = express.Router();

router.post('/', createUser); // not in use
router.get('/:userId', findUserById); // not in use

// admin
router.get('/', authMiddleware, adminMiddleware, allUsers);
router.delete('/:userId', authMiddleware, adminMiddleware, deleteUser);
router.post('/:userId',authMiddleware, adminMiddleware, updateUser);



export default router;
