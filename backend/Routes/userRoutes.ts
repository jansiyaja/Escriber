

import express, { Request, Response } from 'express';
import {userController} from '../frameworks/utils/dependencyResolver';
import { authenticateRefreshToken } from '../frameworks/middleware/tokenValidator';

 export  const userRouter = express.Router();



    
    
 userRouter.post('/register', (req: Request, res: Response) => userController.register(req, res));
 userRouter.post('/verify-otp', (req: Request, res: Response) => userController.verifyOTP(req, res));
 userRouter.post('/login', (req: Request, res: Response) => userController.login(req, res));
 userRouter.post('/verify-token', authenticateRefreshToken, (req: Request, res: Response) => userController.verifyToken(req, res));
 userRouter.post('/resend-otp',(req: Request, res: Response) => userController.resendOTP(req, res))

   
