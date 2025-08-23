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

// Gets all devices (NO HISTORY)
router.get("/getAll", getAllDevices);

// Gets Device by ID (with HISTORY)
router.get("/getById/:id", getDeviceById);

// Creates a device; Default (No SIM, status: true)
router.post("/create", createDevice);

// Updates Name and Device Type ONLY
router.put("/update/:id", updateDevice);

// Updates Device Status ONLY
router.put("/updateStatus/:id", updateDeviceStatus);

// Updates Device Sim ONLY
router.put("/updateSim/:id", updateDeviceSim);

// Deletes Device
router.delete("/delete/:id", deleteDevice);

export default router;
