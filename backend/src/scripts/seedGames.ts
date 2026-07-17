import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { fetchGames } from "../services/espn/gamesService";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const games = await fetchGames();

  for (const game of games) {
    const competition = game.competitions[0];

    const teams = competition.competitors;

    const home = teams.find((team: any) => team.homeAway === "home");

    const away = teams.find((team: any) => team.homeAway === "away");

    if (!home || !away) continue;

    await prisma.game.upsert({
      where: {
        id: game.id,
      },
      update: {
        status: game.status.type.name,
      },
      create: {
        id: game.id,
        date: new Date(game.date),

        homeTeamId: home.team.id,
        awayTeamId: away.team.id,

        status: game.status.type.name,

        season: game.season.year,
        seasonType: game.season.slug,

        venue: competition.venue?.fullName,
        city: competition.venue?.address?.city,
        state: competition.venue?.address?.state,
      },
    });
  }

  console.log("Finished saving games!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
