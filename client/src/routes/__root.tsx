import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Auth } from "../utils/auth";
import type { QueryClient } from "@tanstack/react-query";
import AppNavbar from "@/components/app-navbar";
export const Route = createRootRouteWithContext<{
  auth: Auth;
  queryClient: QueryClient;
}>()({
  component: App,
});

const navMenuItems = [
  {
    triggerText: "Dashboard",
    link: "/dashboard",
  },
];

function App() {
  return (
    <>
      <AppNavbar />
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

export default App;
