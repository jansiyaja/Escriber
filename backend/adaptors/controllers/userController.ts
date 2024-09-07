import { UserRegisterUseCase, VerifyOTPUseCase } from "../../application/useCases/UserUseCases";
import { Request,Response } from "express";

export class UserController{
    constructor(
        private registerUseCase:UserRegisterUseCase,
        private verifyOTPUseCase:VerifyOTPUseCase
    ){}

    async register(req:Request,res:Response):Promise<Response>{
        try {
            console.log("req",req.body);
            
            const {username,email,password}=req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ error: "All fields are required: username, email, and password" });
            }
            
            const newUser=await this.registerUseCase.execute({email,password,username})
            return res.status(200).json(newUser)
        } catch (error) {
            console.error('Error during user registration:', error); 
            return res.status(400).json({ error: "An unexpected error occurred" });
       
            
        }
    }
    async verifyOTP(req:Request, res: Response): Promise<Response> {
        try {
            const { email, otp } = req.body;
            console.log("OTP received:", otp); // Log the received OTP
            console.log("User ID received:", email); // Log the received userId
            
    
            
            const isVerified = await this.verifyOTPUseCase.execute({ otp, email });
            console.log("is verified ");
            
    
            if (isVerified) {
                return res.status(200).send({ message: "User verified successfully" });
            } else {
                return res.status(400).send({ message: "Invalid OTP" });
            }
    
        } catch (error ) {
            return res.status(500).send({ message: error});
        }
    }
    
}