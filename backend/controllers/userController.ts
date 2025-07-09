import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";
import { generateJWT } from "../helpers/functions";
import AreaModel from "../models/areaModel";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find();
  res.status(200).json({ users });
});

export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string;
    };

    const user = await UserModel.findById(decoded._id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required" });
    return;
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  if (await bcrypt.compare(password, user.password)) {
    const { _id, name, email, role, barangay, isActive } = user;
    const userObj = { _id, name, email, role, barangay, isActive };

    const token = generateJWT({ _id: user._id, role: user.role });

    res.status(200).json({
      message: "Login successful",
      token,
      user: userObj,
    });
  } else {
    res.status(401).json({ message: "Login Failed" });
  }
});

export const createUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, role, barangay } = req.body;

    if (!name || !email || !role || !barangay) {
      res.status(400).json({ message: "All fields are required are required" });
      return;
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User with this email already exists." });
      return;
    }

    if(role != "admin" && role != "bhw"){
      res.status(400).json({ message: "Invalid user role" });
      return;
    } 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({ name, email, password: hashedPassword, role, barangay });

    if (newUser) {
      res
        .status(200)
        .json({ message: "Successfully creating new user!", email: newUser.email });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  }
)


export const getBHWArea = asyncHandler(async (req: Request, res: Response) => {
    const { bhwId } = req.params;

    if(!bhwId){
      res.status(400).json({ message: "Invalid BHW ID" });
      return;
    }

    const bhwExists = await UserModel.exists({ _id: bhwId })

    if(!bhwExists){
      res.status(400).json({ message: "BHW not found" });
      return;
    }

    const area = await AreaModel.find({ bhwId: bhwId })

    res.status(200).json({
      area
    })
})

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logout successful" });
});
