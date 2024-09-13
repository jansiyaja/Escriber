 import { IUser  } from "../../enitites/User";


 export interface IUserUseCase{

    registerUser(userData: Partial<IUser>):  Promise<{ user: IUser; accessToken: string; refreshToken: string }>;

    verifyOTP({ otp, email }: { otp: string; email: string }): Promise<boolean> ;

    loginUser(userData: Partial<IUser>): Promise<{ user: IUser; accessToken: string; refreshToken: string }>;

    verifyToken(token: string): Promise<{ accessToken: string; refreshToken: string }> 

    resendOTP({email}:{email:string}):Promise<void>
   

 }