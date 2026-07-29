import { createFileRoute } from "@tanstack/react-router";
import { getGames } from "#/api/api";
import { useState } from "react";

export const Route = createFileRoute("/games/")({
  loader: async () => {
    return await getGames();
  },

  component: RouteComponent,
});

function RouteComponent() {
  const games = Route.useLoaderData();

  const [search, setSearch] = useState("");

  const filteredGames = games.filter((game: any) => {
    const homeTeam = game.homeTeam?.displayName?.toLowerCase() ?? "";
    const awayTeam = game.awayTeam?.displayName?.toLowerCase() ?? "";

    const searchValue = search.toLowerCase();

    return homeTeam.includes(searchValue) || awayTeam.includes(searchValue);
  });

  const groupedGames = filteredGames.reduce((groups: any, game: any) => {
    const date = new Date(game.date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(game);

    return groups;
  }, {});

  return (
    <div className="w-11/12 mx-auto pb-12">
      <div className="text-4xl text-center mt-8">Games</div>

      <div className="text-center mt-5 italic text-[oklch(0.5_0.015_260)]">
        Browse every NBA game and final score.
      </div>

      <div className="flex justify-center mt-8">
        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 rounded-full border px-5 py-3 shadow-sm focus:outline-none"
        />
      </div>

      {Object.entries(groupedGames).map(([date, games]: any) => (
        <section key={date} className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{date}</h2>

              <p className="text-sm text-gray-500">
                {games.length} Game{games.length !== 1 && "s"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {games.map((game: any) => {
              const homeWon =
                game.homeScore !== null && game.homeScore > game.awayScore;

              const awayWon =
                game.awayScore !== null && game.awayScore > game.homeScore;

              return (
                <div
                  key={game.id}
                  className="rounded-3xl border bg-white shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{game.status}</div>

                    <div className="text-sm text-gray-500">
                      {new Date(game.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold"
                          style={{
                            backgroundColor: `#${game.awayTeam?.color || "6b7280"}`,
                          }}
                        >
                          {game.awayTeam?.abbreviation}
                        </div>

                        <div>
                          <div
                            className={`font-semibold ${
                              awayWon ? "text-black" : "text-gray-600"
                            }`}
                          >
                            {game.awayTeam?.displayName}
                          </div>

                          <div className="text-sm text-gray-500">Away</div>
                        </div>
                      </div>

                      <div
                        className={`text-3xl font-bold ${
                          awayWon ? "" : "text-gray-400"
                        }`}
                      >
                        {game.awayScore}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold"
                          style={{
                            backgroundColor: `#${game.homeTeam?.color || "6b7280"}`,
                          }}
                        >
                          {game.homeTeam?.abbreviation}
                        </div>

                        <div>
                          <div
                            className={`font-semibold ${
                              homeWon ? "text-black" : "text-gray-600"
                            }`}
                          >
                            {game.homeTeam?.displayName}
                          </div>

                          <div className="text-sm text-gray-500">Home</div>
                        </div>
                      </div>

                      <div
                        className={`text-3xl font-bold ${
                          homeWon ? "" : "text-gray-400"
                        }`}
                      >
                        {game.homeScore}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="rounded-xl bg-[oklch(0.96_0.005_80)] p-3 text-center">
                      <div className="text-xs text-gray-500">Arena</div>

                      <div className="font-semibold text-sm">
                        {game.arena || "-"}
                      </div>
                    </div>

                    <div className="rounded-xl bg-[oklch(0.96_0.005_80)] p-3 text-center">
                      <div className="text-xs text-gray-500">Season</div>

                      <div className="font-semibold">{game.season}</div>
                    </div>

                    <div className="rounded-xl bg-[oklch(0.96_0.005_80)] p-3 text-center">
                      <div className="text-xs text-gray-500">Winner</div>

                      <div className="font-semibold text-sm">
                        {homeWon
                          ? game.homeTeam?.abbreviation
                          : awayWon
                            ? game.awayTeam?.abbreviation
                            : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {filteredGames.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No games scheduled in the next 7 days.
        </div>
      )}
    </div>
  );
}
