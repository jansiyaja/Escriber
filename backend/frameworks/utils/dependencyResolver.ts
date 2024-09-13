

import { UserRepository } from '../../adaptors/repositories/UserRepository';
import { BcryptHashService } from '../../frameworks/services/hashServices';
import { SMTPService } from '../../frameworks/services/smtpService';
import { OTPVerificationRepository } from '../../adaptors/repositories/OTPRepository';
import { UserUseCase } from '../../application/useCases/UserUseCases';

import { UserController } from '../../adaptors/controllers/userController';


const userRepository=new UserRepository()
const hashService = new  BcryptHashService()
const emailService = new SMTPService();
const otpRepository= new OTPVerificationRepository()

const userUseCases = new UserUseCase(userRepository, hashService, emailService, otpRepository);
const userController = new UserController(userUseCases)


export {
    userController
}