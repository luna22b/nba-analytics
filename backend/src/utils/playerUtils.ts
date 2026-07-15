export function extractTeamId(teamRef: string) {
  const parts = teamRef.split("/");
  return parts[parts.length - 1].split("?")[0];
}

export function extractPlayerStats(stat: any) {
  const offensive = stat.data?.splits?.categories?.find(
    (category: any) => category.name === "offensive",
  );

  const getStat = (name: string) =>
    offensive?.stats.find((s: any) => s.name === name)?.value ?? null;

  return {
    playerId: stat.playerId,

    ppg: getStat("avgPoints"),

    apg: getStat("avgAssists"),

    fgPct: getStat("fieldGoalPct"),

    rpg: getStat("avgOffensiveRebounds"),

    threePointPct: getStat("threePointPct"),

    topg: getStat("avgTurnovers"),
  };
}
