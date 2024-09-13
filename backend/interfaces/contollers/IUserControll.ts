  import { Request,Response } from "express";
 
export interface IUserController {
    register(req: Request, res: Response): Promise<Response>;
    verifyOTP(req: Request, res: Response): Promise<Response>;
    login(req: Request, res: Response): Promise<Response>;
    verifyToken(req: Request, res: Response): Promise<Response>;
    resendOTP(req: Request, res: Response): Promise<Response>;
}