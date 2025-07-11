import ResidentModel from "../models/residentModel";
import AreaModel from "../models/areaModel";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isDocumentExists, isValidObjectId } from "../helpers/functions";

export const getResidentsByAreaId = asyncHandler(
  async (req: Request, res: Response) => {
    const { areaId } = req.params;

    if (!areaId) {
      res.status(400).json({
        message: "Area ID is required",
      });
      return;
    }

    if (!isValidObjectId(areaId)) {
      res.status(400).json({ error: "Invalid ObjectId" });
      return;
    }

    if (!(await isDocumentExists(AreaModel, areaId))) {
      res.status(400).json({ message: "Area not found" });
      return;
    }

    const area = await AreaModel.findById(areaId);

    const residents = await ResidentModel.find({ areaId: areaId });

    res.status(200).json({
      area,
      residents,
    });
  }
);

export const createResident = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      firstName,
      middleName,
      lastName,
      suffix,
      gender,
      birthdate,
      areaId,
      familyPosition,
      occupation,
      civilStatus,
      student,
      garbageDisposal,
      waterSource,
      typeOfToilet,
      // Health fields
      LMP,
      EDC,
      GP,
      TB,
      HPN,
      DM,
      heartDisease,
      disability,
    } = req.body;

    // ✅ Required Fields Validation
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !birthdate ||
      !areaId ||
      !occupation ||
      !civilStatus ||
      familyPosition === undefined ||
      !garbageDisposal ||
      !waterSource ||
      !typeOfToilet
    ) {
      res.status(400).json({ message: "Some required fields are missing." });
      return;
    }

    if (!isValidObjectId(areaId)) {
      res.status(400).json({ error: "Invalid ObjectId" });
      return;
    }

    // ✅ Enum/Union Value Validations
    if (!["Male", "Female"].includes(gender)) {
      res.status(400).json({ message: "Gender must be 'Male' or 'Female'." });
      return;
    }

    if (!["segregated", "not segregated"].includes(garbageDisposal)) {
      res.status(400).json({ message: "Invalid garbage disposal value." });
      return;
    }

    if (!["deep well", "LCWD"].includes(waterSource)) {
      res.status(400).json({ message: "Invalid water source value." });
      return;
    }

    if (!["faucet", "sanitary", "unsanitary"].includes(typeOfToilet)) {
      res.status(400).json({ message: "Invalid toilet type value." });
      return;
    }

    // ✅ Area existence check
    if (!(await isDocumentExists(AreaModel, areaId))) {
      res.status(400).json({ message: "Area not found" });
      return;
    }

    // ✅ Save the new resident
    const newResident = await ResidentModel.create({
      firstName,
      middleName,
      lastName,
      suffix,
      gender,
      birthdate: new Date(birthdate),
      areaId,
      familyPosition,
      occupation,
      civilStatus,
      student,
      garbageDisposal,
      waterSource,
      typeOfToilet,
      LMP,
      EDC,
      GP,
      TB,
      HPN,
      DM,
      heartDisease,
      disability,
    });

    res.status(201).json(newResident);
  }
);

export const updateResident = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({ error: "Invalid resident ID" });
      return;
    }

    const resident = await ResidentModel.findById(id);
    if (!resident) {
      res.status(404).json({ message: "Resident not found" });
      return;
    }

    const {
      firstName,
      middleName,
      lastName,
      suffix,
      gender,
      birthdate,
      areaId,
      familyPosition,
      occupation,
      civilStatus,
      student,
      garbageDisposal,
      waterSource,
      typeOfToilet,
      LMP,
      EDC,
      GP,
      TB,
      HPN,
      DM,
      heartDisease,
      disability,
    } = req.body;

    // Optional: validate required fields if you're doing partial update protection

    // Optional: validate areaId if it changed
    if (areaId && !isValidObjectId(areaId)) {
      res.status(400).json({ error: "Invalid areaId" });
      return;
    }

    // ✅ Perform the update
    resident.firstName = firstName ?? resident.firstName;
    resident.middleName = middleName ?? resident.middleName;
    resident.lastName = lastName ?? resident.lastName;
    resident.suffix = suffix ?? resident.suffix;
    resident.gender = gender ?? resident.gender;
    resident.birthdate = birthdate ? new Date(birthdate) : resident.birthdate;
    resident.areaId = areaId ?? resident.areaId;
    resident.familyPosition =
      familyPosition !== undefined ? familyPosition : resident.familyPosition;
    resident.occupation = occupation ?? resident.occupation;
    resident.civilStatus = civilStatus ?? resident.civilStatus;
    resident.student = student ?? resident.student;
    resident.garbageDisposal = garbageDisposal ?? resident.garbageDisposal;
    resident.waterSource = waterSource ?? resident.waterSource;
    resident.typeOfToilet = typeOfToilet ?? resident.typeOfToilet;
    resident.LMP = LMP ?? resident.LMP;
    resident.EDC = EDC ?? resident.EDC;
    resident.GP = GP ?? resident.GP;
    resident.TB = TB ?? resident.TB;
    resident.HPN = HPN ?? resident.HPN;
    resident.DM = DM ?? resident.DM;
    resident.heartDisease = heartDisease ?? resident.heartDisease;
    resident.disability = disability ?? resident.disability;

    const updatedResident = await resident.save();

    res.status(200).json(updatedResident);
  }
);

export const deleteResident = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || !isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid or missing resident ID" });
      return;
    }

    const resident = await ResidentModel.findById(id);

    if (!resident) {
      res.status(404).json({ message: "Resident not found" });
      return;
    }

    await resident.deleteOne();

    res.status(200).json({ message: "Resident deleted successfully" });
  }
);
