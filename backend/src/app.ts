import express from "express";
import cors from "cors";
import playerRoutes from "./routes/playerRoutes";
import teamRoutes from "./routes/teamRoutes";
import gamesRoutes from "./routes/gamesRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

// espn routes
app.use("/api", playerRoutes);
app.use("/api", teamRoutes);
app.use("/api", gamesRoutes);

export default app;
