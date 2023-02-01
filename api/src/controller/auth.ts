import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import authService from '../services/auth';
import Users from '../models/Users';
import { AlreadyExistError, BadRequestError, DoesNotExist } from '../apiErrors/apiErrors';

//signUp
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, phone, password, retypePassword } = req.body;
  try {
    const existingUser = await Users.findOne({ phone });
    if (existingUser) throw new AlreadyExistError();
    if (password !== retypePassword) throw new BadRequestError();

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new Users({
      userName: userName,
      phone: phone,
      password: hashedPassword,
    });
    const token = await authService.signUp(newUser);
    res.status(200).json(token);
  } catch (err) {
    next(new BadRequestError('Something went wrong', err));
  }
};

//signIn
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone, password } = req.body;
  try {
    const existingUser = await Users.findOne({ phone });
    if (!existingUser) throw new DoesNotExist();

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) throw new BadRequestError();

    const token = await authService.signIn(existingUser);
    res.status(200).json(token);
  } catch (err) {
    next(new BadRequestError('Something went wrong', err));
  }
};
