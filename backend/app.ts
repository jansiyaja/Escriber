import express from 'express';
import cors from 'cors';
import { adminRouter } from './Routes/adminRoutes';
import { userRouter } from './Routes/userRoutes';
import { errorHandler } from './frameworks/middleware/errorHandler';
import cookieParser from 'cookie-parser';

const createApp = () => {
  const app = express();


  app.use(express.json());


  app.use(cookieParser());


  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5000', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  

  

  // User routes
  app.use('/users', userRouter);

  // Admin routes
  app.use('/admin', adminRouter);

  // Error handler - should always be last
  app.use(errorHandler);

  return app;
};

export default createApp;
