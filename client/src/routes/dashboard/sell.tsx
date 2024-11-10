import { createFileRoute } from "@tanstack/react-router";
import { Tabs } from "@mantine/core";
export const Route = createFileRoute("/dashboard/sell")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Sell";
}
