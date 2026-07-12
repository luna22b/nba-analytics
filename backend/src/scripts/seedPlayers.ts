import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  fetchAllPlayerRefs,
  fetchPlayerDetails,
} from "../services/espn/playerService";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Fetching player references...");

  const refs = await fetchAllPlayerRefs();

  console.log(`Found ${refs.length} players`);

  console.log("Fetching player details...");

  const players = await fetchPlayerDetails(refs);

  console.log(`Fetched ${players.length} player details`);

  console.log("Saving players to database...");

  for (const player of players) {
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
        active: player.active,
        position: player.position?.name,
        positionAbbr: player.position?.abbreviation,
        jerseyNumber: player.jersey,
        headshotUrl: player.headshot?.href,
      },

      create: {
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        fullName: player.fullName,
        height: player.height,
        weight: player.weight,
        age: player.age,
        active: player.active,
        position: player.position?.name,
        positionAbbr: player.position?.abbreviation,
        jerseyNumber: player.jersey,
        headshotUrl: player.headshot?.href,
      },
    });
  }

  console.log("Finished saving players!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
