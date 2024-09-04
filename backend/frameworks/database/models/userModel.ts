

import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../../../enitites/User';




const UserSchema: Schema = new Schema(
  {
    Name: { type: String ,
           require:true
            },
    Email: { type: String ,
             unique:true,
            require:true},
    Password: { type: String,
                require:true
     },
    Bio: { type: String,
      require:true
    },
    Dob: { type: Date,
      require:true
     },
    Role: { type: String, enum: ['client', 'user'] },
    Image: { type: String },
    IsActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, 
  }
);

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
