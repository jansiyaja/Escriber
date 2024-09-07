
import { IOTPVerificationRepository } from "../../application/repositories/IOTPVerificationRepo";
import { IOTPVerification } from "../../enitites/IOTPVerification";
import OTPVerification from "../../frameworks/database/models/OTPVerification";

export  class OTPVerificationRepository implements  IOTPVerificationRepository{

    
    async create(data: Partial<IOTPVerification>): Promise<IOTPVerification> {
        return (await OTPVerification.create(data)).save()
    }

    async deleteByUserId(email: string): Promise<void> {
        await OTPVerification.findOneAndDelete({email}) 
    }


   async findByUserByEmail(email: string): Promise<IOTPVerification | null> {
   
    
        const result = await OTPVerification.findOne({ email});
          
         return result;

}

}