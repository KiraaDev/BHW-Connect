import express from "express";
const router = express.Router();

import { authUser, getUsers, loginUser, logoutUser, createUser, getBHWArea } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

router.post("/login", loginUser);            // Login
router.post("/logout", protect, logoutUser); // Logout
router.get("/me", protect, authUser);        // Get current user info

router.get("/", protect, getUsers);   // GET all users
router.post("/", createUser);  // Create a new user

// BHW specific
router.get("/bhws/:bhwId/area", getBHWArea); // Get BHW's assigned area

export default router;
