import prisma from "../db.js";

// Gets all devices (NO HISTORY)
export const getAllDevices = async (req, res) => {
	try {
		const devices = await prisma.device.findMany();
		res.json(devices);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Creates a device; Default (No SIM, status: disabled/false)
export const createDevice = async (req, res) => {
	try {
		const { name, deviceTypeId } = req.body;
		console.log(req.body);
		const device = await prisma.device.create({
			data: { name: name, simCard: "", deviceTypeId: deviceTypeId },
		});
		res.status(201).json(device);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Updates Name and Device Type ONLY
export const updateDevice = async (req, res) => {
	try {
		const { name, deviceTypeId } = req.body;
		const updated = await prisma.device.update({
			where: { id: parseInt(req.params.id) },
			data: { name: name, deviceTypeId: deviceTypeId },
		});
		res.json(updated);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Updates Device Status ONLY
export const updateDeviceStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const updated = await prisma.device.update({
			where: { id: parseInt(req.params.id) },
			data: { status: status },
		});
		res.json(updated);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Updates Device Sim ONLY
export const updateDeviceSim = async (req, res) => {
	try {
		const { deviceId, newSim } = req.body;

		const device = await prisma.device.findUnique({
			where: { id: deviceId },
		});

		if (!device) {
			return res.status(404).json({ error: "Device not found" });
		}

		const result = await prisma.$transaction(async (tx) => {
			const historyRecord = await tx.simHistory.create({
				data: {
					deviceId: deviceId,
					oldSim: device.simCard,
					newSim: newSim,
				},
			});

			const updatedDevice = await tx.device.update({
				where: { id: deviceId },
				data: {
					simCard: newSim,
					dateAdded: new Date(),
				},
			});

			return { historyRecord, updatedDevice };
		});

		res.status(201).json({
			message: "SIM updated and history recorded",
			history: result.historyRecord,
			device: result.updatedDevice,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Deletes Device
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

// Gets Device and its history
export const getDeviceById = async (req, res) => {
	try {
		const device = await prisma.device.findUnique({
			where: { id: parseInt(req.params.id) },
			include: { history: true },
		});

		res.json(device);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
