import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

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
      <NavigationMenu
        className="dark:bg-zinc-900 dark:text-white"
        orientation="vertical"
      >
        <NavigationMenuList className="flex-col items-start space-x-0">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Outlet />
    </div>
  );
}
