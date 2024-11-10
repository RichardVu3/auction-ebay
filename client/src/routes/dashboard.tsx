import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Tabs, TabsTab } from "@mantine/core";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

const tabItems = [
  {
    name: "Summary",
    to: "/dashboard/summary",
  },

  {
    name: "Sell",
    to: "/dashboard/sell",
  },
  {
    name: "Auctions",
    to: "/dashboard/auctions",
  },
  {
    name: "Watchlist",
    to: "/dashboard/watchlist",
  },
];

function RouteComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      Layout Route
      <hr />
      <Tabs
        defaultValue="gallery"
        value={location.pathname}
        onChange={(path) => {
          navigate({ to: `/${path}` });
        }}
        orientation="vertical"
      >
        <Tabs.List>
          {tabItems.map((tab) => {
            return (
              <TabsTab value={tab.to} key={tab.name}>
                {tab.name}
              </TabsTab>
            );
          })}
        </Tabs.List>

        <Outlet />
      </Tabs>
    </div>
  );
}
