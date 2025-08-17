import { Router } from "express";
import prisma from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
	try {
		const devices = await prisma.device.findMany({
			include: {
				history: true,
				deviceType: true,
			},
		});

		const deviceTypes = await prisma.deviceType.findMany();

		// Format the output as required
		res.json({
			devices: devices.map((device) => ({
				id: device.id,
				name: device.name,
				simCard: device.simCard,
				deviceType: device.deviceType
					? {
							id: device.deviceType.id,
							name: device.deviceType.name,
					  }
					: null,
				dateAdded: device.dateAdded,
				status: device.status,
				history: device.history.map((record) => ({
					oldSim: record.oldSim,
					newSim: record.newSim,
					changedAt: record.changedAt,
				})),
			})),
			deviceTypes: deviceTypes.map((dt) => ({
				id: dt.id,
				name: dt.name,
			})),
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
