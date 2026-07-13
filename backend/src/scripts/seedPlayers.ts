import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  fetchAllPlayerRefs,
  fetchPlayerDetails,
  fetchPlayerStats,
} from "../services/espn/playerService";
import "dotenv/config";
import { extractTeamId, extractPlayerStats } from "../utils/playerUtils";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Fetching player references...");

  const refs = await fetchAllPlayerRefs();

  console.log(`Found ${refs.length} players`);

  console.log("Fetching player details...");

  const players = await fetchPlayerDetails(refs);

  console.log(`Fetched ${players.length} player details`);

  const stats = await fetchPlayerStats(players);

  const cleanedStats = stats.map(extractPlayerStats);

  console.log("Saving players to database...");

  for (const player of players) {
    const teamId = player.team ? extractTeamId(player.team.$ref) : null;

    const teamExists = teamId
      ? await prisma.team.findUnique({
          where: { id: teamId },
          select: { id: true },
        })
      : null;

    console.log({
      player: player.fullName,
      teamId,
    });

    await prisma.player.upsert({
      where: {
        id: player.id,
      },

      update: {
        firstName: player.firstName,
        lastName: player.lastName,
        fullName: player.fullName,

        height: player.height,
        weight: player.weight,
        age: player.age,

        dateOfBirth: player.dateOfBirth ? new Date(player.dateOfBirth) : null,

        debutYear: player.debutYear,
        experienceYears: player.experience?.years,

        position: player.position?.name,
        positionAbbr: player.position?.abbreviation,

        jerseyNumber: player.jersey,

        birthCity: player.birthPlace?.city,
        birthState: player.birthPlace?.state,
        birthCountry: player.birthPlace?.country,

        headshotUrl: player.headshot?.href,

        active: player.active,

        team: teamExists
          ? {
              connect: {
                id: teamId!,
              },
            }
          : undefined,
      },

      create: {
        id: player.id,

        firstName: player.firstName,
        lastName: player.lastName,
        fullName: player.fullName,

        height: player.height,
        weight: player.weight,
        age: player.age,

        dateOfBirth: player.dateOfBirth ? new Date(player.dateOfBirth) : null,

        debutYear: player.debutYear,
        experienceYears: player.experience?.years,

        position: player.position?.name,
        positionAbbr: player.position?.abbreviation,

        jerseyNumber: player.jersey,

        birthCity: player.birthPlace?.city,
        birthState: player.birthPlace?.state,
        birthCountry: player.birthPlace?.country,

        headshotUrl: player.headshot?.href,

        active: player.active,

        team: teamExists
          ? {
              connect: {
                id: teamId!,
              },
            }
          : undefined,
      },
    });
  }

  console.log("Finished saving players!");

  console.log("Saving player stats...");

  for (const stat of cleanedStats) {
    await prisma.playerStats.upsert({
      where: {
        playerId: stat.playerId,
      },

      update: {
        ppg: stat.ppg,
        fgPct: stat.fgPct,
        threePointPct: stat.threePointPct,
      },

      create: {
        playerId: stat.playerId,
        ppg: stat.ppg,
        fgPct: stat.fgPct,
        threePointPct: stat.threePointPct,
      },
    });
  }

  console.log("Finished saving stats!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
