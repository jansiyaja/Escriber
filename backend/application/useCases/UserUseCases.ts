import { IUserRepository } from "../repositories/IUserRepository";
import { IUser } from "../../enitites/User";
import UserModel from "../../frameworks/database/models/userModel";
import { HashService } from "../../frameworks/services/hasServices";
import { IEmailService } from "../repositories/IEmailRepository";
import crypto from 'crypto';
import { IOTPVerificationRepository } from "../repositories/IOTPVerificationRepo";

export class UserRegisterUseCase {
    constructor(
        private userRepository: IUserRepository,
        private hashService: HashService,
        private emailServices: IEmailService
    ) {}

    async execute(userData: Partial<IUser>): Promise<IUser> {
        const existingUser = await this.userRepository.findByEmail(userData.email!);
        if (existingUser) {
            throw new Error("User with email already exists");
        }
        
        const hashedPassword = await this.hashService.hash(userData.password!);
        const otp = crypto.randomInt(1000, 9999).toString(); 

        const newUser = new UserModel({
            ...userData,
            password: hashedPassword
        });

        const createUser = await this.userRepository.create(newUser);
        
        await this.emailServices.sendEmail({
            to: userData.email!,
            subject: "Welcome To Escriber, Our Blog Platform!",
            text: `Hi ${userData.username}, welcome to our platform! We're excited to have you here.Your Otp Is ${otp}` 
        });
        
        return createUser;
    }
}

export class VerifyOTPUseCase {
    constructor(
        private userRepository: IUserRepository,
        private otpVerificationRepository: IOTPVerificationRepository
    ) {}

    async execute({ otp, email }: { otp: string; email: string }): Promise<boolean> {
        console.log('Verifying OTP for user ID:', email);
        
        const otpVerification = await this.otpVerificationRepository.findByUserByEmail(email);
        
        if (!otpVerification) {
            console.error('No OTP record found for user ID:', email);
            throw new Error('No OTP record found');
        }

        console.log('Retrieved OTP Verification record:', otpVerification);

        if (otpVerification.otp !== otp) {
            console.error('Invalid OTP provided:', otp);
            throw new Error('Invalid OTP');
        }

        await this.otpVerificationRepository.deleteByUserId(email);
        await this.userRepository.markAsVerified(email);

        return true;
    }
}


