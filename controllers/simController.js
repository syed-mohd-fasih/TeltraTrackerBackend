import prisma from "../db";

// Search by SIM number
export const getSimHistory = async (req, res) => {
	try {
		const { sim } = req.params;

		const history = await prisma.simHistory.findMany({
			where: {
				OR: [{ oldSim: sim }, { newSim: sim }],
			},
			include: {
				device: {
					select: { id: true, name: true },
				},
			},
			orderBy: { changedAt: "asc" },
		});

		res.json(history);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
