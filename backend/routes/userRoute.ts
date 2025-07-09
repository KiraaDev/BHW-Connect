import express from "express";
const router = express.Router();

import { authUser, getUsers, loginUser, logoutUser, createUser, getBHWArea } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

router.get('/:bhwId/area', getBHWArea)

router.get("/users", protect, getUsers);

router.get('/auth', authUser)

router.post("/login", loginUser);

router.post('/new', createUser)

router.post('/logout', protect, logoutUser)

export default router;
