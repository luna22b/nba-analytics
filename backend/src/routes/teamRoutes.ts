import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/teams", async (req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        stats: true,
      },
    });

    return res.json(teams);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch teams" });
  }
});

router.get("/teams/:id", async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const specificTeam = await prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        stats: true,
        players: {
          include: {
            playerStats: true,
          },
        },
      },
    });

    if (!specificTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    return res.json(specificTeam);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch team" });
  }
});

export default router;
