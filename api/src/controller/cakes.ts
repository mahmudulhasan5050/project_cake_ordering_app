import { Request, Response, NextFunction } from 'express';
import cakeService from '../services/cakes';
import Cakes from '../models/Cakes';
import {
  AlreadyExistError,
  BadRequestError,
  NotFoundError,
} from '../apiErrors/apiErrors';

//Find all cakes info
export const allCakes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const findAllCakes = await cakeService.allCake();
    res.status(200).json(findAllCakes);
  } catch (err) {
    next(new BadRequestError('Invalid Request', err));
  }
};

//Find cake by Id
export const findCakeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cakeId = req.params.cakeId;
    const foundCakeById = await cakeService.findCakeById(cakeId);
    res.status(200).json(foundCakeById);
  } catch (err) {
    next(new BadRequestError('Invalid Request', err));
  }
};

//Create cake
export const createCake = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description, selectedFile } = req.body;

    const existingCake = await Cakes.findOne({ name });
    if (existingCake) throw new AlreadyExistError();

    const cake = new Cakes({
      name,
      price,
      description,
      selectedFile,
    });

    const newCake = await cakeService.createCake(cake);
    res.status(200).json(newCake);
  } catch (err) {
    next(new BadRequestError('Can not create Product name', err));
  }
};

//Delete a cake
export const deleteCake = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cakeId = req.params.cakeId;
    const existingCake = await Cakes.findOne({ cakeId });
    if (!existingCake) throw new NotFoundError();

    await cakeService.deleteCake(cakeId);
    res.status(204).end();
  } catch (err) {
    next(new BadRequestError('Can not delete.....', err));
  }
};

//Update Cake info by Id
export const updateCake = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateCakeInfoFromBody = req.body;
    const cakeId = req.params.cakeId;

    const updatedCakeInfo = await cakeService.updateCake(
      cakeId,
      updateCakeInfoFromBody
    );
    res.json(updatedCakeInfo);
  } catch (err) {
    next(new BadRequestError('Can not delete.....', err));
  }
};
