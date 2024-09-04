import mongoose from "mongoose";
 import dotenv from 'dotenv';
 dotenv.config()
 
 export const connectDB= async (): Promise<void> =>{
    console.log(process.env.MONGO_URI );
    
      try {
        console.log("i here");
         const connect=await mongoose.connect(process.env.MONGO_URI as string);
         console.log("i here");
         
         
         console.log(`MongoDB connected with ${connect.connection.host}`);
      } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        process.exit(1);
        
      }
 }



