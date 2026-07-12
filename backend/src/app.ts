import express from "express";
import cors from "cors";
import playerRoutes from "./routes/playerRoutes";

const app = express();

app.use(cors());

// espn routes
app.use("/api", playerRoutes);

export default app;
