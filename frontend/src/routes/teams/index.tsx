import { createFileRoute } from "@tanstack/react-router";
import { getTeams } from "#/api/api";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/teams/")({
  loader: async () => {
    return await getTeams();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const teams = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-4xl text-center mt-8">Teams</div>
      <div className="text-center mt-5 italic text-[oklch(0.5_0.015_260)]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mt-15 rounded-xl">
        {teams.map((team: any) => (
          <div
            key={team.id}
            className="rounded-4xl shadow-md border p-4 bg-white cursor-pointer h-40 flex flex-col"
            onClick={() =>
              navigate({
                to: "/teams/$teamId",
                params: {
                  teamId: team.id,
                },
              })
            }
          >
            <div className="flex items-center gap-4">
              <div
                className="rounded-full h-10 w-10 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: `#${team.color}` }}
              >
                {team.abbreviation}
              </div>

              <div className="font-bold">{team.displayName}</div>
            </div>

            <div className="mt-4 bg-[oklch(0.96_0.005_80)] rounded-4xl h-20 flex gap-15 w-40/41 items-center text-center mx-auto justify-center">
              <div>
                <p className="text-sm text-gray-500">PPG</p>
                <p className="font-bold">{team.stats?.ppg.toFixed(1)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">FG%</p>
                <p className="font-bold">{team.stats?.fgPct.toFixed(1)}%</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">3P%</p>
                <p className="font-bold">
                  {team.stats?.threePointPct.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
