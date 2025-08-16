import express from "express";
import {
	getAllDevices,
	createDevice,
	updateDevice,
	deleteDevice,
	getDeviceById,
	updateDeviceStatus,
	updateDeviceSim,
} from "../controllers/devicesController.js";

const router = express.Router();

router.get("/", getAllDevices);
router.post("/", createDevice);
router.put("/:id", updateDevice);
router.put("/:id", updateDeviceStatus);
router.put("/", updateDeviceSim);
router.delete("/:id", deleteDevice);
router.get("/:id", getDeviceById);

export default router;
