import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import { IUser } from "../../enitites/User";
import {HashService} from "../../frameworks/services/hashServices";
import { IEmailService } from "../../interfaces/repositories/IEmailRepository";
import crypto from 'crypto';
import { IOTPVerificationRepository } from "../../interfaces/repositories/IOTPVerificationRepo";
import { generateAccessToken, generateRefreshToken } from "../../frameworks/services/jwtServices";
import jwt from 'jsonwebtoken';
import { IUserUseCase } from "../../interfaces/usecases/IUserCase";
import { logger } from "../../frameworks/services/logger";
import { BadRequestError, InvalidTokenError } from "../../frameworks/errors/BadRequestError";



export class UserUseCase  implements IUserUseCase{
    constructor(
        private _userRepository: IUserRepository,
        private _hashService: HashService,
        private _emailServices: IEmailService,
        private _otpRepository: IOTPVerificationRepository
    ) {}

    async registerUser(userData: Partial<IUser>):Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        
        logger.info('checking existing user')

        const existingUser = await this._userRepository.findByEmail(userData.email!);
        console.log(existingUser);
        
        if (existingUser) {
           throw new  BadRequestError("User with email already exists")
            
        }
        
        const hashedPassword = await this._hashService.hash(userData.password!);
        const otp = crypto.randomInt(1000, 9999).toString();
        console.log(otp);
        

        const newUser: IUser = {
            ...userData,          
            password: hashedPassword, 
            isVerified: false    
        } as IUser;

        const createUser = await this._userRepository.create(newUser);

        if (!createUser.email) {
            throw new Error("Failed to create user: Email is null");
        }

        const newOtp = { otp: otp, email: createUser.email };
        await this._otpRepository.create(newOtp);

        await this._emailServices.sendEmail({
            to: userData.email!,
            subject: "Welcome To Escriber, Our Blog Platform!",
            text: `Hi ${userData.username}, welcome to our platform! We're excited to have you here.Your Otp Is ${otp}`
        });

        const accessToken = generateAccessToken(createUser._id!);
        const refreshToken = generateRefreshToken(createUser._id!);

        return {
            user: createUser,
            accessToken,
            refreshToken
        };
    }

    async verifyOTP({ otp, email }: { otp: string; email: string }): Promise<boolean> {

       logger.info('Verifying OTP for email', { email });
        
        const otpVerification = await this._otpRepository.findByUserByEmail(email);
        
        if (!otpVerification) {
            throw new BadRequestError("No OTP record found for this email");
        }

        if (otpVerification.otp !== otp) {
            throw new BadRequestError("Invalid OTP provided");
        }


        await this._userRepository.markAsVerified(email);
        await this._otpRepository.deleteByUserId(email);

        return true;
    }

    async loginUser(userData: Partial<IUser>): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        const existingUser = await this._userRepository.findByEmail(userData.email!);
        if (!existingUser) {
            throw new Error("User with email not exists");
        }
        
        const isMatch = await this._hashService.compare(userData.password!, existingUser.password!);

        if (!isMatch) {
            throw new Error("Invalid password");
        }
           
        const userId = existingUser._id;
        if (!userId) {
          throw new Error("User ID is missing");
        }
          const accessToken = generateAccessToken(userId);
          const refreshToken = generateRefreshToken(userId);
          
          

         return{
            user:existingUser,
            accessToken:accessToken,
            refreshToken:refreshToken
         }
    }

    async verifyToken(token: string): Promise<{ accessToken: string; refreshToken: string }> {
        try {
            logger.info('Starting token verification');
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string };

            const user = await this._userRepository.findById(decoded.userId);
            
            if (!user || !user._id) {
                throw new Error('User not found or user ID is missing');
            }

            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            return {
                accessToken,
                refreshToken
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            throw new Error('Invalid or expired refresh token');
        }
    }
    async resendOTP({ email }: { email: string; }): Promise<void> {
              const otp = crypto.randomInt(1000, 9999).toString();

              console.log("new OTP",otp );
              console.log("new Email",email );
              
              await this._otpRepository.updateOtp(email, otp);

             const userData= await this._userRepository.findByEmail(email)
              console.log(userData,"user");
              
            
             if(!userData){
                 throw new InvalidTokenError('There is no user  with this email')
             }

              await this._emailServices.sendEmail({
                  to: userData.email!,
                  subject: "Welcome To Escriber, Our Blog Platform!",
                  text: `Hi ${userData.username}, welcome to our platform! We're excited to have you here.Your Otp Is ${otp}`
              });
      
    }
}
