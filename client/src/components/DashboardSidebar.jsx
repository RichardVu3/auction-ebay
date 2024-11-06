import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "My Auctions",
    to: "dashboard/",
    icon: HomeIcon,
    count: "5",
    current: true,
    adminRoute: false,
  },
  {
    name: "Watchlist",
    to: "dashboard/",
    icon: UsersIcon,
    current: false,
    adminRoute: false,
  },

  {
    name: "Order History",
    to: "dashboard/",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: "Analytics",
    to: "dashboard/",
    icon: ChartPieIcon,
    count: "12",
    current: false,
    adminRoute: true,
  },
  {
    name: "Calendar",
    to: "dashboard/",
    icon: CalendarIcon,
    count: "20+",
    current: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardSidebar() {
  return (
    <nav aria-label="Sidebar" className="sm:hidden flex flex-1 flex-col">
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              to={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
              )}
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
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
