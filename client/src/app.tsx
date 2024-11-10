import { Outlet } from "@tanstack/react-router";
import "@mantine/core/styles.css";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  MantineProvider,
} from "@mantine/core";
import HeaderMegaMenu from "./components/header-mega-menu";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
      <MantineProvider>
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
    </>
  );
}

export default App;
