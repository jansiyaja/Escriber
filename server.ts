
import dotenv from'dotenv';
import { connectDB } from './backend/frameworks/config/db';
import createApp from './backend/app';
import { scheduleUserCleanup } from './backend/frameworks/services/cleanUpServices';


dotenv.config()
const app =createApp();

connectDB().then(()=>{
 
    scheduleUserCleanup();
  const port = process.env.PORT 
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    }).catch((err) => {
      console.error('Failed to connect to the database:', err);
    });