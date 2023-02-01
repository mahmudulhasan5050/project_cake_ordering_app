import { Request, Response, NextFunction } from 'express';
import { TokenData } from '..';
import { ForbiddenError } from '../apiErrors/apiErrors';
import Users from '../models/Users';

const adminCheck = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.tokenData as TokenData;
  const checkUserAdmin = await Users.findById(user.id);


    if (checkUserAdmin?.isAdmin) {
      next();
    } else {
      throw new ForbiddenError();
    }
};

export default adminCheck;
