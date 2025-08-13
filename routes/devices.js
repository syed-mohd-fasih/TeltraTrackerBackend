import express from "express";
import { getAllDevices, createDevice, updateDevice, deleteDevice } from "../controllers/devicesController.js";

const router = express.Router();

router.get("/", getAllDevices);
router.post("/", createDevice);
router.put("/:id", updateDevice);
router.delete("/:id", deleteDevice);

export default router;
