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

export default router;
