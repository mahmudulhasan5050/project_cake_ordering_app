import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import {
  allOrders,
  createOrder,
  deleteOrder,
  findOrderById,
  updateOrder,
  updateDeliveryStatus,
  findOrdersByUserId
} from '../controller/orders';

const router = express.Router();


router.get('/userorders/:userId',authMiddleware, findOrdersByUserId)
router.post('/',authMiddleware, createOrder);
router.get('/:orderId',authMiddleware, findOrderById);  // not in use

//admin
router.get('/',authMiddleware,adminMiddleware, allOrders);
router.delete('/:orderId',authMiddleware,adminMiddleware, deleteOrder);
router.post('/:orderId',authMiddleware,adminMiddleware, updateOrder);  //not in use
router.post('/deliverystatus/:orderId',authMiddleware,adminMiddleware, updateDeliveryStatus);



export default router;
