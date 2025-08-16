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
router.get("/", getDeviceTypes);

// Get a single device type by ID
router.get("/:id", getDeviceTypeById);

// Create a new device type
router.post("/", createDeviceType);

// Update an existing device type
router.put("/:id", updateDeviceType);

// Delete a device type
router.delete("/:id", deleteDeviceType);

export default router;
