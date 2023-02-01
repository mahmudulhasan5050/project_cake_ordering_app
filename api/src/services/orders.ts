import { NotFoundError } from '../apiErrors/apiErrors';
import Orders, { OrderType } from '../models/Orders';

const allOrders = async () => {
  return await Orders.find().populate('cakeId').populate('userId');
};
const findOrderById = async (orderId: string) => {
  const foundOrderById = await Orders.findById(orderId);
  if (!foundOrderById) throw new NotFoundError('Order is not found!!');
  return foundOrderById;
};
const createOrder = async (order: OrderType) => {
  const saveOrder = await order.save();
  return saveOrder;
};

const deleteOrder = async (orderId: string) => {
  const deleteFromOrderDatabase = await Orders.findByIdAndDelete(orderId);
  if (!deleteFromOrderDatabase) {
    throw new NotFoundError('Order is not found!!');
  }
  return deleteFromOrderDatabase;
};

const updateOrder = async (
  orderId: string,
  updateOrderInfoFromBody: OrderType
) => {
  const findAndUpdateOrder = await Orders.findByIdAndUpdate(
    orderId,
    updateOrderInfoFromBody,
    { new: true }
  );
  if (!findAndUpdateOrder)
    throw new NotFoundError('Can not update order info!!');
  return findAndUpdateOrder;
};

const updateDeliveryStatus = async (orderId: string) => {
  const findAndUpdateOrder = await Orders.findByIdAndUpdate(
    orderId,
    [{ $set: { deliveryStatus: { $not: '$deliveryStatus' } } }],
    { new: true }
  )
    .populate('cakeId')
    .populate('userId');
  if (!findAndUpdateOrder)
    throw new NotFoundError('Can not update order info!!');
  return findAndUpdateOrder;
};

const findOrderByUserId = async (userId: string) => {
  const foundOrderByUserId = await Orders.find({ userId })
    .populate('userId')
    .populate('cakeId');

  if (!foundOrderByUserId) throw new NotFoundError('Order is not found!!');
  return foundOrderByUserId;
};

export default {
  allOrders,
  createOrder,
  deleteOrder,
  findOrderById,
  updateOrder,
  updateDeliveryStatus,
  findOrderByUserId,
};
