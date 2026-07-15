import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/players", async (req: Request, res: Response) => {
  try {
    const players = await prisma.player.findMany({
      include: {
        playerStats: true,
        team: true,
      },
    });

    res.json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

router.get("/players/:id", async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const specificPlayer = await prisma.player.findUnique({
      where: {
        id,
      },
      include: {
        playerStats: true,
        team: true,
      },
    });

    if (!specificPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }

    return res.json(specificPlayer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch player" });
  }
});

export default router;
