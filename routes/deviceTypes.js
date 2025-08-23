import { Router } from "express";
import {
	getDeviceTypes,
	getDeviceTypeById,
	createDeviceType,
	updateDeviceType,
	deleteDeviceType,
} from "../controllers/deviceTypesController.js";

const router = Router();

// Get all device types
router.get("/getAll", getDeviceTypes);

// Get a single device type by ID
router.get("/getById/:id", getDeviceTypeById);

// Create a new device type
router.post("/create", createDeviceType);

// Update an existing device type
router.put("/update/:id", updateDeviceType);

// Delete a device type
router.delete("/delete/:id", deleteDeviceType);

export default router;
