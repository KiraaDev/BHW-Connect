import express from "express";
import { createResident, deleteResident, getResidentsByAreaId, updateResident } from "../controllers/residentController";
const router = express.Router();

router.get('/area/:areaId', getResidentsByAreaId);

router.post('/', createResident);

router.put('/:id', updateResident);

router.delete('/:id', deleteResident)

export default router