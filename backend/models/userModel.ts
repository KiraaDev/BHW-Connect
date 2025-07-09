import { Schema, model } from 'mongoose';
import { UserType } from '../types/userType';

const userSchema = new Schema<UserType>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'bhw'], required: true },
    barangay: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserModel = model<UserType>('User', userSchema);