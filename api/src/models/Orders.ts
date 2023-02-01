import mongoose, { Document } from 'mongoose';

export type OrderType = Document & {
  userId: mongoose.Types.ObjectId;
  cakeId: mongoose.Types.ObjectId;
  amount: number;
  totalPrice: number;
  orderDate: Date;
  deliveryDate: Date;
  deliveryStatus: boolean;
};

const orderSchema = new mongoose.Schema({
  cakeId: { type: mongoose.Types.ObjectId, ref: 'Cakes' },
  userId: { type: mongoose.Types.ObjectId, ref: 'Users' },

  amount: {
    type: Number,
    default: 1,
  },
  totalPrice: {
    type: Number,
  },
  orderDate: {
    type: Date,
    default: new Date(),
  },
  deliveryDate: {
    type: Date
  },
  deliveryStatus: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<OrderType>('Orders', orderSchema);
