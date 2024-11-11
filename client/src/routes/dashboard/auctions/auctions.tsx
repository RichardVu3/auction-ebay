import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/auctions/auctions")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
