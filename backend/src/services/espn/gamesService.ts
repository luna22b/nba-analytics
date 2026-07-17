import axios from "axios";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchGames() {
  const games = [];

  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const formattedDate = date.toISOString().split("T")[0].replace(/-/g, "");

    const response = await axios.get(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${formattedDate}`,
    );

    const data = response.data;

    if (data.events) {
      games.push(...data.events);
    }

    await sleep(1000);
  }

  return games;
}
