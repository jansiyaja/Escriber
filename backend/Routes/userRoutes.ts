 import  express, {Request,Response} from 'express';
 
import { UserRepository } from '../adaptors/repositories/UserRepository';
import { BcryptHashService } from '../frameworks/services/hasServices';
import { UserRegisterUseCase, VerifyOTPUseCase } from '../application/useCases/UserUseCases';
import { SMTPService } from '../frameworks/services/smtpService';
import{UserController} from '../adaptors/controllers/userController';
import { OTPVerificationRepository } from '../adaptors/repositories/OTPRepository';




export const userRouter=express.Router();

 //dependencies

 // dependencies
const userRepository = new UserRepository();
const hashService = new BcryptHashService();
const emailService = new SMTPService();
const otpVerificationRepository = new OTPVerificationRepository();
const registerUserUseCase = new UserRegisterUseCase(userRepository, hashService,emailService);
const verifyOTPUseCase = new VerifyOTPUseCase(userRepository,otpVerificationRepository)


const userController = new UserController(registerUserUseCase,verifyOTPUseCase);

userRouter.post('/register', (req, res) => userController.register(req, res));;
userRouter.post('/verify-otp', (req, res) => userController.verifyOTP(req, res));

