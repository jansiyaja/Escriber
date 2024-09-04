import { IUserRepository } from "../../adaptors/repositories/IUserRepository";
import { IUser } from "../../enitites/User";
import UserModel from "../../frameworks/database/models/userModel";
import { HashService } from "../../frameworks/services/hasServices";

 export class userRegisterUseCase{
    constructor(
        private userRepository:IUserRepository,
        private hashService:HashService
    ){}

    async execute(userData:Partial<IUser>):Promise <IUser>{
        const existingUser=await this.userRepository.findByEmail(userData.email!)
        if(existingUser){
            throw new Error("user with eamil already exists")
        }
        const hashedPassword=await this.hashService.hash(userData.password!)

        const newUser=new UserModel({
            ...userData,
            password:hashedPassword
        })
        
        return await this.userRepository.create(newUser)
    }
 }