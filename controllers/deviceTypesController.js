import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a new DeviceType
 */
export const createDeviceType = async (req, res) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ error: "DeviceType name is required" });
		}

		const newType = await prisma.deviceType.create({
			data: { name },
		});

		res.status(201).json(newType);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/**
 * Get all DeviceTypes
 */
export const getDeviceTypes = async (req, res) => {
	try {
		const types = await prisma.deviceType.findMany();

		res.json(types);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/**
 * Get a single DeviceType by ID
 */
export const getDeviceTypeById = async (req, res) => {
	try {
		const { id } = req.params;

		const type = await prisma.deviceType.findUnique({
			where: { id: parseInt(id) },
		});

		if (!type) {
			return res.status(404).json({ error: "DeviceType not found" });
		}

		res.json(type);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/**
 * Update a DeviceType
 */
export const updateDeviceType = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		const updatedType = await prisma.deviceType.update({
			where: { id: parseInt(id) },
			data: { name },
		});

		res.json(updatedType);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

/**
 * Delete a DeviceType
 */
export const deleteDeviceType = async (req, res) => {
	try {
		const { id } = req.params;

		await prisma.deviceType.delete({
			where: { id: parseInt(id) },
		});

		res.json({ message: "DeviceType deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
