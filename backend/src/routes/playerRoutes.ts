import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/players", async (req: Request, res: Response) => {
  try {
    const players = await prisma.player.findMany();
    return res.json(players);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch players" });
  }
});

export default router;
