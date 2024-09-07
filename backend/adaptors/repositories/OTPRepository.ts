
import { IOTPVerificationRepository } from "../../application/repositories/IOTPVerificationRepo";
import { IOTPVerification } from "../../enitites/IOTPVerification";
import OTPVerification from "../../frameworks/database/models/OTPVerification";

export  class OTPVerificationRepository implements  IOTPVerificationRepository{

    
    async create(data: Partial<IOTPVerification>): Promise<IOTPVerification> {
        return await OTPVerification.create(data)
    }

    async deleteByUserId(email: string): Promise<void> {
        await OTPVerification.findOneAndDelete({email}) 
    }

   // Example of a repository method implementation
   async findByUserByEmail(email: string): Promise<IOTPVerification | null> {
   
     console.log('Querying OTP for userId:', email);
        const result = await OTPVerification.findOne({ email});
          console.log('Query result:', result);
         return result;

}

}