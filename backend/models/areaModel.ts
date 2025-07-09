import { Schema, model } from 'mongoose';
import { AreaType } from '../types/areaType';

const areaSchema = new Schema<AreaType>(
  {
    name: { type: String, required: true },
    barangay: { type: String, required: true },
    bhwId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

const AreaModel = model<AreaType>('Area', areaSchema);

export default AreaModel;
