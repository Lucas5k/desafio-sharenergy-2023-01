import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import userRouter from './routes/router.login';
import registerRouter from './routes/router.register';
import errorHandler from './middlewares/error';

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://www.google.com/']
}));
app.use(express.json());
app.use(userRouter);
app.use(registerRouter);
app.use(errorHandler);

export default app;
