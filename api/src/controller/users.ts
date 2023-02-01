import { Request, Response, NextFunction } from 'express';
import userService from '../services/users';
import Users from '../models/Users';
import { AlreadyExistError, BadRequestError } from '../apiErrors/apiErrors';

//Find all user info
export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const findAllUsers = await userService.allUsers();
    res.status(200).json(findAllUsers);
  } catch (err) {
    next(new BadRequestError('Invalid Request', err));
  }
};

//Find user by Id
export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.params.userId;
    const foundUserById = await userService.findUserById(userId);
    res.status(200).json(foundUserById);
    
  } catch (err) {
    next(new BadRequestError('Invalid Request', err));
  }
};

//Create user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, phone } = req.body;

    const existingUser = await Users.findOne({ phone });
    if (existingUser) throw new AlreadyExistError();

    const user = new Users({
      userName,
      phone,
    });

    await userService.createUser(user);
    res.status(200).json(user);
  } catch (err) {
    next(new BadRequestError('Can not create user', err));
  }
};

//Delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;

    await userService.deleteUser(userId);
    res.status(204).end();
  } catch (err) {
    next(new BadRequestError('Can not delete user.....', err));
  }
};

//Update user info by Id
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateUserInfoFromBody = req.body;
    const userId = req.params.userId;

    const updatedUserInfo = await userService.updateUser(
      userId,
      updateUserInfoFromBody
    );
    res.json(updatedUserInfo);
  } catch (err) {
    next(new BadRequestError('Can not delete user.....', err));
  }
};
