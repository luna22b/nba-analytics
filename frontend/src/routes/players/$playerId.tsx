import { createFileRoute } from "@tanstack/react-router";
import { getSpecificPlayer } from "#/api/api";

export const Route = createFileRoute("/players/$playerId")({
  loader: async ({ params: { playerId } }) => {
    return await getSpecificPlayer(playerId);
  },

  component: RouteComponent,
});

function RouteComponent() {
  const player = Route.useLoaderData();
  console.log(player);

  const stats = player.playerStats?.[0];

  return (
    <div className="w-11/12 mx-auto pb-12">
      <div className="text-4xl text-center mt-8">
        {player.firstName} {player.lastName}
      </div>

      <div className="text-center mt-3 italic text-[oklch(0.5_0.015_260)]">
        Player Profile
      </div>

      <div className="mt-10 rounded-4xl border bg-white shadow-sm p-6">
        <div className="flex items-center gap-5">
          <div
            className="h-20 w-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            style={{
              backgroundColor: `#${player.team?.color || "6b7280"}`,
            }}
          >
            {player.firstName[0]}
            {player.lastName[0]}
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {player.firstName} {player.lastName}
            </h2>

            <p className="text-gray-500 mt-1">
              {player.team?.displayName || "Free Agent"}
            </p>

            <p className="text-gray-500">
              {player.position || "Position Unknown"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="rounded-3xl bg-[oklch(0.96_0.005_80)] p-5 text-center">
            <p className="text-sm text-gray-500">Points Per Game</p>

            <p className="text-3xl font-bold mt-2">
              {stats?.ppg?.toFixed(1) ?? "-"}
            </p>
          </div>

          <div className="rounded-3xl bg-[oklch(0.96_0.005_80)] p-5 text-center">
            <p className="text-sm text-gray-500">Field Goal %</p>

            <p className="text-3xl font-bold mt-2">
              {stats?.fgPct?.toFixed(1) ?? "-"}%
            </p>
          </div>

          <div className="rounded-3xl bg-[oklch(0.96_0.005_80)] p-5 text-center">
            <p className="text-sm text-gray-500">Turnovers Per Game</p>

            <p className="text-3xl font-bold mt-2">
              {stats?.topg?.toFixed(1) ?? "-"}
            </p>
          </div>

          <div className="rounded-3xl bg-[oklch(0.96_0.005_80)] p-5 text-center">
            <p className="text-sm text-gray-500">Rebounds Per Game</p>

            <p className="text-3xl font-bold mt-2">
              {stats?.rpg?.toFixed(1) ?? "-"}
            </p>
          </div>

          <div className="rounded-3xl bg-[oklch(0.96_0.005_80)] p-5 text-center">
            <p className="text-sm text-gray-500">Three Point %</p>

            <p className="text-3xl font-bold mt-2">
              {stats?.threePointPct?.toFixed(1) ?? "-"}%
            </p>
          </div>

          <div className="rounded-3xl bg-[oklch(0.96_0.005_80)] p-5 text-center">
            <p className="text-sm text-gray-500">Assists Per Game</p>

            <p className="text-3xl font-bold mt-2">
              {stats?.apg?.toFixed(1) ?? "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <div className="rounded-4xl border bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold">Recent Games</h2>

          <p className="text-gray-500 mt-3">Game history will appear here.</p>
        </div>

        <div className="rounded-4xl border bg-white shadow-sm p-6">
          <h2 className="text-xl font-bold">Predictions</h2>

          <p className="text-gray-500 mt-3">ML predictions will appear here.</p>
        </div>
      </div>
    </div>
  );
}
