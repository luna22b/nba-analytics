import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Users, CalendarDays, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="w-11/12 mx-auto pb-12">
      <section className="mt-12 text-center">
        <div className="text-5xl font-bold tracking-tight">
          Welcome to Statline
        </div>

        <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
          Explore NBA teams, players, and games all in one place. Track stats,
          compare performances, and stay connected with the league.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/games"
            className="rounded-full bg-black text-white px-6 py-3 font-semibold hover:opacity-80 transition"
          >
            View Games
          </Link>

          <Link
            to="/players"
            className="rounded-full border px-6 py-3 font-semibold hover:bg-gray-100 transition"
          >
            Browse Players
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
        <div className="rounded-4xl border bg-white shadow-sm p-6">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <CalendarDays />
          </div>

          <h2 className="text-xl font-bold mt-5">NBA Games</h2>

          <p className="text-gray-500 mt-3">
            View upcoming matchups, scores, and recent game results.
          </p>
        </div>

        <div className="rounded-4xl border bg-white shadow-sm p-6">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex in items-center justify-center">
            <Users />
          </div>

          <h2 className="text-xl font-bold mt-5">Players</h2>

          <p className="text-gray-500 mt-3">
            Browse NBA players and explore their team information and stats.
          </p>
        </div>

        <div className="rounded-4xl border bg-white shadow-sm p-6">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <TrendingUp />
          </div>

          <h2 className="text-xl font-bold mt-5">Analytics</h2>

          <p className="text-gray-500 mt-3">
            Discover trends and performance insights across the league.
          </p>
        </div>
      </section>

      <section className="mt-16 rounded-4xl border bg-white shadow-sm p-8">
        <div className="flex items-center gap-3">
          <Trophy />

          <h2 className="text-2xl font-bold">NBA Dashboard</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="rounded-2xl bg-[oklch(0.96_0.005_80)] p-5">
            <p className="text-sm text-gray-500">Teams</p>

            <p className="text-3xl font-bold mt-2">30</p>
          </div>

          <div className="rounded-2xl bg-[oklch(0.96_0.005_80)] p-5">
            <p className="text-sm text-gray-500">Players</p>

            <p className="text-3xl font-bold mt-2">500+</p>
          </div>

          <div className="rounded-2xl bg-[oklch(0.96_0.005_80)] p-5">
            <p className="text-sm text-gray-500">Games</p>

            <p className="text-3xl font-bold mt-2">1,200+</p>
          </div>
        </div>
      </section>
    </div>
  );
}
