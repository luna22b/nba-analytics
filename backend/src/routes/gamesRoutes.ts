import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/games", async (req: Request, res: Response) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return res.json(games);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to fetch games",
    });
  }
});
