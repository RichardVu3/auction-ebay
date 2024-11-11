import { Outlet, createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/dashboard/auctions")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      asdnfioasdfn
      <Outlet />;
    </>
  );
}
