import { createLazyFileRoute } from "@tanstack/react-router";
import HeroContentLeft from "../components/hero";
export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <HeroContentLeft />;
}
