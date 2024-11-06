import {
  ChartPieIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "My Auctions",
    to: "/dashboard/auctions",
    icon: HomeIcon,
    adminRoute: false,
  },
  {
    name: "Watchlist",
    to: "/dashboard/watchlist",
    icon: UsersIcon,
    adminRoute: false,
  },

  {
    name: "Order History",
    to: "/dashboard/orders",
    icon: DocumentDuplicateIcon,
    adminRoute: false,
  },
  {
    name: "Analytics",
    to: "/dashboard/analytics",
    icon: ChartPieIcon,
    adminRoute: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardSidebar() {
  const baseStyles =
    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold";
  return (
    <nav aria-label="Sidebar" className="sm:hidden md:flex flex-1 flex-col">
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <NavLink
              end
              key={item.name}
              to={item.to}
              className={({ isActive }) => {
                [
                  isActive
                    ? "bg-gray-50 text-indigo-600 group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                ];
              }}
            >
              <item.icon
                aria-hidden="true"
                className={classNames(
                  item.current
                    ? "text-indigo-600"
                    : "text-gray-400 group-hover:text-indigo-600",
                  "h-6 w-6 shrink-0",
                )}
              />
              {item.name}
              {item.count ? (
                <span
                  aria-hidden="true"
                  className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs/5 font-medium text-gray-600 ring-1 ring-inset ring-gray-200"
                >
                  {item.count}
                </span>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
