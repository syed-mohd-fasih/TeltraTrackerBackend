import express from "express";
import cors from "cors";
import devicesRoutes from "./routes/devices.js";
import historyRoutes from "./routes/history.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/devices", devicesRoutes);
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
