import mongoose, { Document } from 'mongoose';

export type UserType = Document & {
  userName: string
  phone: string
  password: string
  isAdmin: boolean
};

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    index: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    reqired: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model<UserType>('Users', userSchema);
