import express from 'express';
import cors from 'cors';
import { userRouter } from './Routes/userRoutes';
import { errorHandler } from './frameworks/middleware/errorHandler';


const createApp = () => {
    const app = express();


    app.use(express.json());
    app.use(cors());
  
    app.use('/users', userRouter);

 
   app.use(errorHandler);
    return app;
  };
  export default createApp;