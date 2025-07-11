import mongoose from "mongoose";
import { Resident as ResidentType } from "../types/residentType";

type ResidentDocument = ResidentType & Document;

const ResidentSchema = new mongoose.Schema<ResidentDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    suffix: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    familyPosition: {
      type: Number,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
      trim: true,
    },
    civilStatus: {
      type: String,
      required: true,
    },
    student: {
      type: String,
      enum: [
        "PS", "EU", "ES", "EG", "HU", "HS", "HG",
        "SHS", "ALS", "CU", "CS", "CG", "PG", "VOC", "NA"
      ],
    },
    garbageDisposal: {
      type: String,
      enum: ["segregated", "not segregated"],
      required: true,
    },
    waterSource: {
      type: String,
      enum: ["deep well", "LCWD"],
      required: true,
    },
    typeOfToilet: {
      type: String,
      enum: ["faucet", "sanitary", "unsanitary"],
      required: true,
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },

    // Health Status
    LMP: {
      type: Boolean,
      default: null,
    },
    EDC: {
      type: Boolean,
    },
    GP: {
      type: Boolean,
    },
    TB: {
      type: Boolean,
    },
    HPN: {
      type: Boolean,
    },
    DM: {
      type: Boolean,
    },
    heartDisease: {
      type: Boolean,
    },
    disability: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resident", ResidentSchema);
