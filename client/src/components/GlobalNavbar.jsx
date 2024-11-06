import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Electronics", to: "/categories/electronics", end: false },
  { name: "Motors", to: "/categories/motors", end: true },
  { name: "Collectibles", to: "/categories/collectibles", end: false },
  { name: "Home & Garden", to: "/categories/homegarden", end: false },
  {
    name: "Clothing, Shoes & Accessories",
    to: "/categories/clothingshoesaccessories",
    end: false,
  },
  { name: "Toys", to: "categories/toys", end: false },
  { name: "Sporting Goods", to: "categories/sportinggoods", end: false },
  { name: "Jewelry & Watches", to: "categories/jewelrywatches", end: false },
  {
    name: "Business & Industrial",
    to: "categories/businessindustrial",
    end: false,
  },
];
const userNavigation = [
  { name: "Your Profile", to: "#" },
  { name: "Settings", to: "#" },
  { name: "Sign out", to: "#" },
];

// const { path, text, icon } = props;
const iconButtons = [
  {
    name: "notifications",
    text: "View Notifications",
    path: "",
    icon: <BellIcon aria-hidden="true" className="h-6 w-6" />,
  },
  {
    name: "cart",
    text: "View Cart",
    path: "",
    icon: <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SecondaryNavLinks = () => {
  const activeStyle =
    "inline-flex items-center rounded-md px-1	 py-2 text-sm font-medium bg-gray-900 text-white";
  const inactiveStyle =
    "inline-flex items-center rounded-md px-1 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <nav aria-label="Global" className="hidden lg:flex lg:space-x-8 lg:py-2">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={({ isActive }) => [isActive ? activeStyle : inactiveStyle]}
          end={item.end}
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

const Searchbar = () => {
  return (
    <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
      <div className="w-full sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </div>
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Search"
            className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
};

const CompanyLogo = () => {
  return (
    <div className="relative z-10 flex px-2 lg:px-0">
      <div className="flex shrink-0 items-center">
        <img
          alt="Your Company"
          src={
            "https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
          }
          className="h-8 w-auto"
        />
      </div>
    </div>
  );
};

const NavbarIconButton = (props) => {
  const { ibtn } = props;
  return (
    <button
      type="button"
      className="relative shrink-0 mx-1 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">{ibtn.text}</span>
      {ibtn.icon}
    </button>
  );
};

const MobileNavDropdown = () => {
  return (
    <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            to={item.to}
            aria-end={item.current ? "page" : undefined}
            className={classNames(
              item.end
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium",
            )}
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>

      {/*Mobile User Panel*/}
      <div className="border-t border-gray-700 pb-3 pt-4">
        <div className="flex items-center px-4">
          <div className="shrink-0">
            <img
              alt=""
              src={user.imageUrl}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-white">{user.name}</div>
            <div className="text-sm font-medium text-gray-400">
              {user.email}
            </div>
          </div>

          <button
            type="button"
            className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-3 space-y-1 px-2">
          {userNavigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              to={item.to}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </div>
    </DisclosurePanel>
  );
};

const DesktopProfileDropdown = () => {
  return (
    <Menu as="div" className="relative ml-4 shrink-0">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {userNavigation.map((item) => (
          <MenuItem key={item.name}>
            <a
              to={item.to}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
            >
              {item.name}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default function GlobalNavbar() {
  return (
    <Disclosure as="header" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <CompanyLogo />
          <Searchbar />

          <div className="relative z-10 flex items-center lg:hidden">
            {/* Mobile menu button */}
            <NavbarIconButton
              ibtn={{
                name: "cart",
                text: "View Cart",
                path: "",
                icon: (
                  <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                ),
              }}
            />

            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            {iconButtons.map((ibtn) => {
              return <NavbarIconButton key={ibtn.name} ibtn={ibtn} />;
            })}
            {/* Profile dropdown */}
            <DesktopProfileDropdown />
          </div>
        </div>
        {/*Secondary Links*/}
        <SecondaryNavLinks />

        {/*Secondary Links End*/}
      </div>
      <MobileNavDropdown />
    </Disclosure>
  );
}
