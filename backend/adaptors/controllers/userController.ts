
import {  Request,Response } from "express";
import { IUserUseCase } from "../../interfaces/usecases/IUserCase";
import { IUserController } from "../../interfaces/contollers/IUserControll";
import { HttpStatusCode } from "./enums";
import { BadRequestError,InternalServerError, InvalidTokenError } from "../../frameworks/errors/BadRequestError";
import { logger } from "../../frameworks/services/logger";


export class UserController implements IUserController{
    constructor(
        private _userUseCase:IUserUseCase,
        
    ){}

    async register(req:Request,res:Response):Promise<Response>{
       
        try {
            console.log("req",req.body);
            
            const {username,email,password}=req.body;
            

            if (!username || !email || !password) {
                throw new BadRequestError("All fields are required: username, email, and password");
            }
            
             const newUser=await this._userUseCase.registerUser({email,password,username})

             
            
            return res.status(HttpStatusCode.CREATED).json(newUser)
        } catch (error) {


            if (error instanceof BadRequestError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
           console.log("hdsk",error);
           
           return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: new InternalServerError("An unexpected error occurred").serializeError() });
            
        }
    }
    async verifyOTP(req:Request, res: Response): Promise<Response> {
        try {
            const { email, otp } = req.body;
            const isVerified = await this._userUseCase.verifyOTP({ otp, email });
            
            
    
            if (isVerified) {
                return res.status(HttpStatusCode.OK).json({ message: "User verified successfully" });
            } else {
                throw new BadRequestError("Invalid OTP .Please verify");
                
            }
    
        } catch (error ) {
            if (error instanceof BadRequestError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: new InternalServerError("An unexpected error occurred").serializeError() });
        }
    }
    async resendOTP(req: Request, res: Response): Promise<Response> {

        logger.info("resent otp  controller")
        try {
          const { email } = req.body;
          console.log("resend mail",email);
          
          await this._userUseCase.resendOTP({email});
          return res.status(HttpStatusCode.OK).json({ message: "OTP resent successfully" });
        } catch (error) {

            if (error instanceof InvalidTokenError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
          console.error("Internal Server Error:", error);
          return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: new InternalServerError("An unexpected error occurred").serializeError() });
        }
      }
    
    async login(req:Request, res: Response): Promise<Response> {
        
        try {
            console.log("login",req.body);
            const {email,password}=req.body;

            if ( !email || !password) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({ error: "All fields are required: username, email, and password" });
            }

            const { user, accessToken, refreshToken } = await this._userUseCase.loginUser({ email, password });

         
            return res.status(HttpStatusCode.OK).json({ user,accessToken,refreshToken });
            
        } catch (error) {
            
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: "An unexpected error occurred" }); 
        }
    }
  
    async verifyToken(req: Request, res: Response): Promise<Response> {

        try {

            const { token } = req.body;

            if (!token) {
                return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Refresh token is missing' });
            }
            const { accessToken, refreshToken } = await this._userUseCase.verifyToken(token);
          
            
            return res.status(HttpStatusCode.OK).json({ accessToken, refreshToken });
        } catch (error) {
            return res.status(HttpStatusCode.UNAUTHORIZED).json( "errorr");
        }
    }
    
}
