import express from "express";
import cors from "cors";

import devicesRoutes from "./routes/devices.js";
import simRoutes from "./routes/sim.js";
import deviceTypeRoutes from "./routes/deviceTypes.js";
import helloRoutes from "./routes/hello.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/devices", devicesRoutes);
app.use("/api/sim", simRoutes);
app.use("/api/devicetype", deviceTypeRoutes);
app.use("/api", helloRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
