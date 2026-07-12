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
  const batchSize = 1;

  for (let i = 0; i < refs.length; i += batchSize) {
    const batch = refs.slice(i, i + batchSize);

    const responses = await Promise.all(
      batch.map(async (ref) => {
        try {
          return await axios.get(ref.$ref);
        } catch (err) {
          console.log(`Failed to fetch ${ref.$ref}`);
          return null;
        }
      }),
    );

    players.push(
      ...responses.filter((res) => res !== null).map((res) => res!.data),
    );

    console.log(
      `Fetched ${Math.min(i + batchSize, refs.length)} / ${refs.length}`,
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return players;
}
