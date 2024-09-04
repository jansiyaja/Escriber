import { IUserRepository } from "../../adaptors/repositories/IUserRepository";
import { IUser } from "../../enitites/User";
import UserModel from "../../frameworks/database/models/userModel";


export class UserRepository  implements IUserRepository{

 async create(user: IUser): Promise<IUser> {
    const result=await UserModel.create(user);
    return result.toObject()
 }
 async findById(id: string): Promise<IUser | null> {
     return await UserModel.findById(id).lean().exec();
 }

 async findByEmail(email: string): Promise<IUser | null> {
     return await UserModel.findOne({email}).lean().exec();
 }

 async update(user: IUser): Promise<IUser> {
     try {
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, { new: true }).lean().exec();
        
        if (!updatedUser) {
            throw new Error('User not found');
          }
          return updatedUser;

     } catch (error) {
            throw new Error(`Failed to update user: ${error}`);
     }
 }

 async delete(id: string): Promise<void> {
     await UserModel.findByIdAndDelete(id).lean().exec()
 }
}