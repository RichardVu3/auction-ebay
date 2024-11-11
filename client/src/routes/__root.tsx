import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Auth } from "../utils/auth";
import type { QueryClient } from "@tanstack/react-query";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Icons } from "@/components/ui/icons";
import { CommandMenu } from "@/components/command-menu";
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

function SiteHeader() {
  return <></>;
}

function App() {
  return (
    <>
      <div className="flex-1">
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <Outlet />
        </main>
      </div>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

export default App;
