import { Types } from "mongoose";

export type AreaType = {
    _id: Types.ObjectId;
    name: string;
    barangay: string;
    bhwId?: Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
  };
  