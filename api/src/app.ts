import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import cors from 'cors';

import { MongoUri, Port } from './utils/secrets';
import cakeRouter from './routers/cakes';
import userRouter from './routers/users';
import orderRouter from './routers/orders';
import authRouter from './routers/auth';

mongoose
  .connect(MongoUri)
  .then(() => {
    console.log('mongoDB connected!!');
  })
  .catch((err) => {
    console.log('Mongo Error' + err);
  });

const app: Application = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/cakes', cakeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/auth', authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    status: error.status || 500,
    message: error.message,
  });
};

app.use(errorHandler);

const PORT: Number = Number(process.env.PORT);

app.listen(Port, () => {
  console.log(`server is on port ${Port}`);
});
