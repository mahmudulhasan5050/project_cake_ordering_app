import { NotFoundError } from '../apiErrors/apiErrors';
import Cakes, { CakeType } from '../models/Cakes';

const allCake = () => {
  return Cakes.find();
};
const findCakeById = async(cakeId: string) => {
  const foundCakeById = await Cakes.findById(cakeId);
  if(!foundCakeById) throw new NotFoundError("Cake is not found!!");
  return foundCakeById;
};
const createCake = async(cake: CakeType) => {
  
   const saveCake = await cake.save();
   return saveCake;
};

const deleteCake = async (cakeId: string) => {
  const deleteFromCakeDatabase = await Cakes.findByIdAndDelete(cakeId);
  if (!deleteFromCakeDatabase) {
    throw new NotFoundError('Cake is not found!!');
  }

  return deleteFromCakeDatabase; 
};

const updateCake = async (cakeId: string, updateCakeInfoFromBody: CakeType) => {
  const findAndUpdateCake = await Cakes.findByIdAndUpdate(cakeId, updateCakeInfoFromBody,{new: true});
  if(!findAndUpdateCake) throw new NotFoundError("Can not update cake info!!");
  return findAndUpdateCake;
};

export default {
  allCake,
  createCake,
  deleteCake,
  findCakeById,
  updateCake
};
