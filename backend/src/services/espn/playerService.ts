import axios from "axios";

export async function fetchAllPlayerRefs() {
  const refs = [];

  let page = 1;
  let pageCount = 1;

  do {
    const response = await axios.get(
      "https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/athletes",
      {
        params: {
          active: true,
          page,
        },
      },
    );

    const data = response.data;

    // push all refs into an array
    refs.push(...data.items);

    // incrementing pageCount after every pass
    // once max pages reached, the loop will end
    pageCount = data.pageCount;

    page++;
  } while (page <= pageCount);

  return refs;
}

export async function fetchPlayerDetails(refs: { $ref: string }[]) {
  const players = [];

  for (const ref of refs) {
    try {
      const res = await axios.get(ref.$ref);

      players.push(res.data);
    } catch (err) {
      console.error({
        message: `Failed to fetch ${ref.$ref}`,
        error: err instanceof Error ? err.message : err,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return players;
}

export async function fetchPlayerStats(players: any[]) {
  const stats = [];

  for (const player of players) {
    if (!player.statistics?.$ref) continue;

    try {
      const res = await axios.get(player.statistics.$ref);

      stats.push({
        playerId: player.id,
        data: res.data,
      });
    } catch (err) {
      console.error(
        `Failed stats for ${player.fullName}:`,
        err instanceof Error ? err.message : err,
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return stats;
}
