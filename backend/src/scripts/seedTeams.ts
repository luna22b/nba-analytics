import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  fetchAllTeamRefs,
  fetchTeamDetails,
  fetchTeamStats,
} from "../services/espn/teamService";
import { extractTeamStats } from "../utils/teamUtils";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Fetching team references...");

  const refs = await fetchAllTeamRefs();

  console.log(`Found ${refs.length} teams`);

  console.log("Fetching team details...");

  const teams = await fetchTeamDetails(refs);

  const teamStats = await fetchTeamStats(teams);

  const cleanedTeamStats = teamStats.map(extractTeamStats);

  console.log(`Fetched ${teams.length} team details`);

  console.log("Saving teams to database...");

  for (const team of teams) {
    await prisma.team.upsert({
      where: {
        id: team.id,
      },

      update: {
        name: team.name,
        displayName: team.displayName,
        abbreviation: team.abbreviation,

        location: team.location,
        nickname: team.nickname,

        logoUrl: team.logos?.[0]?.href,

        color: team.color,
        alternateColor: team.alternateColor,
      },

      create: {
        id: team.id,

        name: team.name,
        displayName: team.displayName,
        abbreviation: team.abbreviation,

        location: team.location,
        nickname: team.nickname,

        logoUrl: team.logos?.[0]?.href,

        color: team.color,
        alternateColor: team.alternateColor,
      },
    });
  }

  console.log("Saving team stats...");

  for (const stat of cleanedTeamStats) {
    await prisma.teamStat.upsert({
      where: {
        teamId: stat.teamId,
      },

      update: {
        ppg: stat.ppg,
        fgPct: stat.fgPct,
        threePointPct: stat.threePointPct,
        apg: stat.apg,
        rpg: stat.rpg,
        spg: stat.spg,
        bpg: stat.bpg,
      },

      create: {
        teamId: stat.teamId,
        ppg: stat.ppg,
        fgPct: stat.fgPct,
        threePointPct: stat.threePointPct,
        apg: stat.apg,
        rpg: stat.rpg,
        spg: stat.spg,
        bpg: stat.bpg,
      },
    });
  }

  console.log("Finished saving team stats!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
