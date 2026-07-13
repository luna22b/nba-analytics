import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/players")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>hello!</div>;
}
