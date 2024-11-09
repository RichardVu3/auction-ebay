import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/auctions")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /dashboard/auctions!";
}
