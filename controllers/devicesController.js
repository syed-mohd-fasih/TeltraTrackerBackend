import prisma from "../db.js";

export const getAllDevices = async (req, res) => {
	try {
		const devices = await prisma.device.findMany({ include: { history: true } });
		res.json(devices);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const createDevice = async (req, res) => {
	try {
		const { name, simCard, deviceType } = req.body;
		const device = await prisma.device.create({
			data: { name, simCard, deviceType },
		});
		res.status(201).json(device);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const updateDevice = async (req, res) => {
	try {
		const { name, simCard, deviceType, status } = req.body;
		const updated = await prisma.device.update({
			where: { id: parseInt(req.params.id) },
			data: { name, simCard, deviceType, status },
		});
		res.json(updated);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const deleteDevice = async (req, res) => {
	try {
		await prisma.device.delete({
			where: { id: parseInt(req.params.id) },
		});
		res.json({ message: "Device deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
