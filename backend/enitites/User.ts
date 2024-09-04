

import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  Name: string | null;
  Email: string | null;
  Password: string | null;
  Bio: string | null;
  Dob: Date | null;
  Role: 'client' | 'user' | null;
  Image: string | null;
  IsActive: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
