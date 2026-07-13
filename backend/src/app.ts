import express from "express";
import cors from "cors";
import playerRoutes from "./routes/playerRoutes";
import teamRoutes from "./routes/teamRoutes";

const app = express();

app.use(cors());

// espn routes
app.use("/api", playerRoutes);
app.use("/api", teamRoutes);

export default app;
