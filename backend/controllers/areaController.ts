import AreaModel from "../models/areaModel";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";

export const createArea = asyncHandler(async (req: Request, res: Response) => {
  const { name, barangay, bhwId } = req.body;

  if (!name || !barangay) {
    res.status(400).json({
      message: "Name and Barangay are Required.",
    });
    return;
  }

  if (bhwId) {
    const bhwExists = await UserModel.exists({ _id: bhwId, role: "bhw" });

    if (!bhwExists) {
      res.status(400).json({
        message: "Invalid BHW ID",
      });
      return;
    }
  }

  const areaExists = await AreaModel.exists({ name });

  if (areaExists) {
    res.status(400).json({
      message: "This area is already exists.",
    });
    return;
  }

  const newArea = {
    name,
    barangay,
    bhwId: bhwId ?? null,
  };

  await AreaModel.create(newArea);

  res.status(200).json(newArea);
});
