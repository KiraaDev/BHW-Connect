import { Types } from 'mongoose';

export type UserRole = 'admin' | 'bhw';

export type UserType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  barangay: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
