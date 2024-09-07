

import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../../../enitites/User';




const UserSchema: Schema = new Schema(
  {
    username: { type: String ,
           require:true
            },
    email: { type: String ,
             unique:true,
            require:true},
    password: { type: String,
                require:true
     },
    bio: { type: String,
      require:true
    },
    dob: { type: Date,
      require:true
     },
    role: { type: String, enum: ['client', 'user'] },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    isVerified: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true, 
  }
);

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
