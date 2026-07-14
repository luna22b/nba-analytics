import { createFileRoute } from "@tanstack/react-router";
import { getPlayers } from "#/api/api";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/players/")({
  loader: async () => {
    return await getPlayers();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const players = Route.useLoaderData();
  console.log(players);

  return (
    <div>
      <div className="text-4xl text-center mt-8">Players</div>
      <div className="text-center mt-5 italic text-[oklch(0.5_0.015_260)]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
      <div>
        {players.map((player: any) => (
          <div key={player.id}>{player.firstName}</div>
        ))}
      </div>
    </div>
  );
}
