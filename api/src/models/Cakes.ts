import mongoose, { Document } from 'mongoose';

export type CakeType = Document & {
  name: string
  price: number
  description: string
  selectedFile: string
};

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  selectedFile:{
    type: String,
    required: true
  }
});

export default mongoose.model<CakeType>('Cakes', cakeSchema);