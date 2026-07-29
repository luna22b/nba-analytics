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

  const stats = team.stats;

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          <StatCard label="Points / Game" value={stats?.ppg?.toFixed(1)} />

          <StatCard
            label="Field Goal %"
            value={`${stats?.fgPct?.toFixed(1) ?? "--"}%`}
          />

          <StatCard
            label="Three-Point %"
            value={`${stats?.threePointPct?.toFixed(1) ?? "--"}%`}
          />

          <StatCard label="Rebounds" value={stats?.rpg?.toFixed(1)} />

          <StatCard label="Steals" value={stats?.spg?.toFixed(1)} />

          <StatCard label="Blocks" value={stats?.bpg?.toFixed(1)} />
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
                  #{player.jerseyNumber ?? "??"} · {player.position ?? "--"}
                </p>
              </div>

              <div className="flex gap-6">
                <PlayerStat label="PPG" value={player.playerStats?.ppg} />

                <PlayerStat label="RPG" value={player.playerStats?.rpg} />

                <PlayerStat label="APG" value={player.playerStats?.apg} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-[oklch(0.96_0.005_80)] rounded-2xl flex flex-col items-center justify-center h-20">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl">{value ?? "--"}</p>
    </div>
  );
}

function PlayerStat({ label, value }: { label: string; value?: number }) {
  return (
    <div className="w-14 text-center">
      <p className="text-xs text-[oklch(0.5_0.015_260)] uppercase">{label}</p>

      <p>{value !== null && value !== undefined ? value.toFixed(1) : "--"}</p>
    </div>
  );
}
