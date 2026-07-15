import { createFileRoute } from "@tanstack/react-router";
import { getSpecificTeam } from "#/api/api";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/teams/$teamId")({
  loader: async ({ params: { teamId } }) => {
    return await getSpecificTeam(teamId);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const team = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      <div className="rounded-4xl shadow-md border p-6 bg-white h-40 w-11/12 mx-auto mt-20 max-w-3xl">
        <div className="flex items-center h-full gap-6">
          <div
            className="rounded-3xl w-20 h-20 flex items-center justify-center text-white font-bold text-2xl shrink-0"
            style={{ backgroundColor: `#${team.color}` }}
          >
            {team.abbreviation}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-md text-gray-500">{team.location}</p>

            <h1 className="font-bold leading-tight text-2xl">{team.name}</h1>
          </div>
        </div>
      </div>

      <div className="rounded-4xl shadow-md border p-6 bg-white h-102 w-11/12 mx-auto mt-10 max-w-3xl md:h-72">
        <div className="text-[oklch(0.5_0.015_260)]">Season Averages</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4 ">
          <div className="bg-[oklch(0.96_0.005_80)] rounded-2xl flex flex-col items-center justify-center h-20">
            <p className="text-sm text-gray-500">Points / Game</p>
            <p className="text-2xl">{team.stats.ppg.toFixed(1)}</p>
          </div>

          <div className="bg-[oklch(0.96_0.005_80)] rounded-2xl flex flex-col items-center justify-center h-20">
            <p className="text-sm text-gray-500">Field Goal %</p>
            <p className="text-2xl">{team.stats.fgPct.toFixed(1)}%</p>
          </div>

          <div className="bg-[oklch(0.96_0.005_80)] rounded-2xl flex flex-col items-center justify-center h-20">
            <p className="text-sm text-gray-500">Three-Point %</p>
            <p className="text-2xl">{team.stats.threePointPct.toFixed(1)}</p>
          </div>

          <div className="bg-[oklch(0.96_0.005_80)] rounded-2xl flex flex-col items-center justify-center h-20">
            <p className="text-sm text-gray-500">Rebounds</p>
            <p className="text-2xl">{team.stats.rpg.toFixed(1)}</p>
          </div>

          <div className="bg-[oklch(0.96_0.005_80)] rounded-2xl flex flex-col items-center justify-center h-20">
            <p className="text-sm text-gray-500">Steals</p>
            <p className="text-2xl">{team.stats.spg.toFixed(1)}</p>
          </div>

          <div className="bg-[oklch(0.96_0.005_80)] rounded-2xl flex flex-col items-center justify-center h-20">
            <p className="text-sm text-gray-500">Blocks</p>
            <p className="text-2xl">{team.stats.bpg.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-4xl shadow-md border p-6 bg-white w-11/12 mx-auto mt-10 max-w-3xl">
        <div className="text-[oklch(0.5_0.015_260)]">
          Roster ({team.players.length})
        </div>
        <div>
          {team.players.map((player: any) => (
            <div
              key={player.id}
              className="rounded-2xl border p-5 mt-4 flex justify-between items-center bg-[oklch(0.96_0.005_80)] cursor-pointer"
              onClick={() =>
                navigate({
                  to: "/players/$playerId",
                  params: {
                    playerId: player.id,
                  },
                })
              }
            >
              <div>
                <p className="font-bold">
                  {player.firstName} {player.lastName}
                </p>
                <p className="text-[oklch(0.5_0.015_260)]">
                  #{player.jerseyNumber ? player.jerseyNumber : "??"} ·{" "}
                  {player.position}
                </p>
              </div>

              <div className="flex gap-6">
                <div className="w-14 text-center">
                  <p className="text-xs text-[oklch(0.5_0.015_260)] uppercase">
                    PPG
                  </p>
                  <p>{player.playerStats[0]?.ppg?.toFixed(1) ?? "--"}</p>
                </div>

                <div className="w-14 text-center">
                  <p className="text-xs text-[oklch(0.5_0.015_260)] uppercase">
                    RPG
                  </p>
                  <p>{player.playerStats[0]?.rpg?.toFixed(1) ?? "--"}</p>
                </div>

                <div className="w-14 text-center">
                  <p className="text-xs text-[oklch(0.5_0.015_260)] uppercase">
                    APG
                  </p>
                  <p>{player.playerStats[0]?.apg?.toFixed(1) ?? "--"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
