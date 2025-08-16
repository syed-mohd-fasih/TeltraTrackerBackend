import express from "express";
import { getSimHistory } from "../controllers/simController.js";

const router = express.Router();

router.get("/:sim", getSimHistory);

export default router;
