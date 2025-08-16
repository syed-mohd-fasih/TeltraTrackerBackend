import express from "express";
import { getSimHistory } from "../controllers/simController";

const router = express.Router();

router.get("/:sim", getSimHistory);

export default router;
