import express from "express";
import { getHistoryByDevice, addSimChange } from "../controllers/historyController.js";

const router = express.Router();

router.get("/:deviceId", getHistoryByDevice);
router.post("/", addSimChange);

export default router;
