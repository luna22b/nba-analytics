import { createFileRoute } from "@tanstack/react-router";
import { getPlayers } from "#/api/api";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/players/")({
  loader: async () => {
    return await getPlayers();
  },

  component: RouteComponent,
});

function RouteComponent() {
  const players = Route.useLoaderData();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredPlayers = players.filter((player: any) => {
    const playerName = `${player.firstName} ${player.lastName}`.toLowerCase();

    const teamName = player.team?.displayName?.toLowerCase() || "";

    const searchValue = search.toLowerCase();

    return playerName.includes(searchValue) || teamName.includes(searchValue);
  });

  const groupedPlayers = filteredPlayers.reduce((groups: any, player: any) => {
    const teamName = player.team?.displayName ?? "Free Agents";

    if (!groups[teamName]) {
      groups[teamName] = [];
    }

    groups[teamName].push(player);

    return groups;
  }, {});

  return (
    <div className="w-11/12 mx-auto pb-12">
      <div className="text-4xl text-center mt-8">Players</div>

      <div className="text-center mt-5 italic text-[oklch(0.5_0.015_260)]">
        Browse every NBA player by team.
      </div>

      <div className="flex justify-center mt-8">
        <input
          type="text"
          placeholder="Search players or teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 rounded-full border px-5 py-3 shadow-sm focus:outline-none"
        />
      </div>

      {Object.entries(groupedPlayers).map(([teamName, teamPlayers]: any) => (
        <section key={teamName} className="mt-14">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{
                backgroundColor: `#${teamPlayers[0].team?.color || "6b7280"}`,
              }}
            >
              {teamPlayers[0].team?.abbreviation}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{teamName}</h2>

              <p className="text-sm text-gray-500">
                {teamPlayers.length} Players
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {teamPlayers.map((player: any) => (
              <div
                key={player.id}
                className="rounded-3xl border bg-white shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/players/$playerId",
                    params: {
                      playerId: player.id,
                    },
                  })
                }
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{
                      backgroundColor: `#${player.team?.color || "6b7280"}`,
                    }}
                  >
                    {player.firstName[0]}
                    {player.lastName[0]}
                  </div>

                  <div>
                    <div className="font-semibold">
                      {player.firstName} {player.lastName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {player.position || "—"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div className="rounded-xl bg-[oklch(0.96_0.005_80)] p-3 text-center">
                    <div className="text-xs text-gray-500">PPG</div>

                    <div className="font-bold">
                      {player.playerStats?.[0]?.ppg?.toFixed(1) ?? "-"}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[oklch(0.96_0.005_80)] p-3 text-center">
                    <div className="text-xs text-gray-500">FG%</div>

                    <div className="font-bold">
                      {player.playerStats?.[0]?.fgPct?.toFixed(1) ?? "-"}%
                    </div>
                  </div>

                  <div className="rounded-xl bg-[oklch(0.96_0.005_80)] p-3 text-center">
                    <div className="text-xs text-gray-500">3P%</div>

                    <div className="font-bold">
                      {player.playerStats?.[0]?.threePointPct?.toFixed(1) ??
                        "-"}
                      %
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {filteredPlayers.length === 0 && (
        <div className="text-center mt-10 text-gray-500">No players found.</div>
      )}
    </div>
  );
}
