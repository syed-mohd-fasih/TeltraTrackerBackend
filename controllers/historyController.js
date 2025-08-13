import prisma from "../db.js";

export const getHistoryByDevice = async (req, res) => {
	try {
		const history = await prisma.simHistory.findMany({
			where: { deviceId: parseInt(req.params.deviceId) },
			orderBy: { changedAt: "desc" },
		});
		res.json(history);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const addSimChange = async (req, res) => {
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
					deviceId,
					oldSim: device.simCard,
					newSim,
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
