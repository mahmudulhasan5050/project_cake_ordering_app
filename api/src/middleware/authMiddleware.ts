import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, ForbiddenError } from '../apiErrors/apiErrors';
import { TokenData } from '..';

import { secretAuth } from '../utils/secrets';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedError();

    if (token) {
      const varifiedAdminUser = jwt.verify(token, secretAuth) as TokenData;
     
      req.tokenData = varifiedAdminUser;
      next();
    } else {
      throw new ForbiddenError();
    }
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleware;
