import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  createTheme,
  MantineProvider,
} from "@mantine/core";
import HeaderMegaMenu from "../components/header-mega-menu";
import { useDisclosure } from "@mantine/hooks";
import type { Auth } from "../utils/auth";
import type { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
  auth: Auth;
  queryClient: QueryClient;
}>()({
  component: App,
});

const theme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
});

function App() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
      <MantineProvider theme={theme}>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: { sm: 200, lg: 0 },
            breakpoint: "xl",
            collapsed: { mobile: !drawerOpened, desktop: !desktopOpened },
          }}
          padding="sm"
        >
          <AppShellHeader>
            <HeaderMegaMenu
              drawerOpened={drawerOpened}
              toggleDrawer={toggleDrawer}
              closeDrawer={closeDrawer}
            />
          </AppShellHeader>

          <AppShellMain>
            <Outlet />
          </AppShellMain>
        </AppShell>
      </MantineProvider>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

export default App;
