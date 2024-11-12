import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auctions/$auctionId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /auctions/$auctionId/edit!";
}
