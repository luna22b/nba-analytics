export function extractTeamStats(stat: any) {
  const categories = stat.data.results.stats.categories;

  const offensive = categories.find(
    (category: any) => category.name === "offensive",
  );

  const defensive = categories.find(
    (category: any) => category.name === "defensive",
  );

  const general = categories.find(
    (category: any) => category.name === "general",
  );

  return {
    teamId: stat.teamId,

    ppg: offensive?.stats.find((s: any) => s.name === "avgPoints")?.value,

    fgPct: offensive?.stats.find((s: any) => s.name === "fieldGoalPct")?.value,

    threePointPct: offensive?.stats.find((s: any) => s.name === "threePointPct")
      ?.value,

    apg: offensive?.stats.find((s: any) => s.name === "avgAssists")?.value,

    rpg: general?.stats.find((s: any) => s.name === "avgRebounds")?.value,

    spg: defensive?.stats.find((s: any) => s.name === "avgSteals")?.value,

    bpg: defensive?.stats.find((s: any) => s.name === "avgBlocks")?.value,
  };
}
