import { NotFoundError } from '../apiErrors/apiErrors';
import Users, { UserType } from '../models/Users';

const allUsers = () => {
  return Users.find();
};
const findUserById = async (userId: string) => {
  const foundUserById = await Users.findById(userId);
  if (!foundUserById) throw new NotFoundError('User is not found!!');
  return foundUserById;
};
const createUser = async (user: UserType) => {
  const saveUser = await user.save();
  return saveUser;
};

const deleteUser = async (userId: string) => {
  const deleteFromUserDatabase = await Users.findByIdAndDelete(userId);
  if (!deleteFromUserDatabase) {
    throw new NotFoundError('User is not found!!');
  }
  return deleteFromUserDatabase;
};

const updateUser = async (userId: string, updateUserInfoFromBody: UserType) => {
  const findAndUpdateUser = await Users.findByIdAndUpdate(
    userId,
    updateUserInfoFromBody,
    { new: true }
  );
  if (!findAndUpdateUser) throw new NotFoundError('Can not update user info!!');
  return findAndUpdateUser;
};

export default {
  allUsers,
  createUser,
  deleteUser,
  findUserById,
  updateUser,
};
