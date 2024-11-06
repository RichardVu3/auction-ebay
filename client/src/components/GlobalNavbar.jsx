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
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
const userNavigation = [
  {
    name: "dashboard",
    text: "Dashboard",
    path: "dashboard",
    end: true,
  },
  {
    name: "auctions",
    text: "My Auctions",
    path: "dashboard/auctions",
    end: true,
  },
  {
    name: "watchlist",
    text: "Watchlist",
    path: "dashboard/watchlist",
    end: true,
  },
];

const menuItems = [
  {
    name: "root",
    text: "Home",
    path: "/",
    end: false,
  },

  {
    name: "dashboard",
    text: "Dashboard",
    path: "dashboard",
    end: true,
  },
  {
    name: "auctions",
    text: "My Auctions",
    path: "dashboard/auctions",
    end: true,
  },
  {
    name: "watchlist",
    text: "Watchlist",
    path: "dashboard/watchlist",
    end: true,
  },
];
const Searchbar = () => {
  return (
    <div className="w-full max-w-lg lg:max-w-xs">
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
          className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

{
  /*
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-8 w-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
          >
            Your Profile
          </a>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
          >
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
          >
            Sign out
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
	*/
}

const ProfileDropDown = () => {
  return (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-8 w-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {userNavigation.map((item) => {
          return (
            <MenuItem key={item.name}>
              <NavLink to={item.path}>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  {item.text}
                </a>
              </NavLink>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

const MobileProfileDropDown = () => {
  return (
    <div className="border-t border-gray-700 pb-3 pt-4">
      <div className="flex items-center px-5">
        <div className="shrink-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="ml-3">
          <div className="text-base font-medium text-white">Tom Cook</div>
          <div className="text-sm font-medium text-gray-400">
            tom@example.com
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
        <DisclosureButton
          as="a"
          href="#"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Your Profile
        </DisclosureButton>
        <DisclosureButton
          as="a"
          href="#"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Settings
        </DisclosureButton>
        <DisclosureButton
          as="a"
          href="#"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Sign out
        </DisclosureButton>
      </div>
    </div>
  );
};

const MobileMenuHamburgerButton = () => {
  return (
    <>
      <div className="flex lg:hidden">
        {/* Mobile menu button */}
        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open main menu</span>
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
      <div className="hidden lg:ml-4 lg:block">
        <div className="flex items-center">
          <button
            type="button"
            className="relative flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="h-6 w-6" />
          </button>

          {/* Profile dropdown */}
          <ProfileDropDown />
        </div>
      </div>
    </>
  );
};

const MobileMenuPanel = () => {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {menuItems.map((item) => {
          return (
            <DisclosureButton
              as="div"
              key={item.name}
              className="block rounded-md"
            >
              <NavLink
                className={({ isActive }) => [
                  isActive
                    ? "block rounded-md px-3 py-2 text-base font-medium bg-gray-900 text-white"
                    : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white",
                ]}
                key={item.name}
                to={item.path}
                end={item.end}
              >
                {item.text}
              </NavLink>
            </DisclosureButton>
          );
        })}
      </div>

      {/*Mobile Profile Dropdown*/}
      <MobileProfileDropDown />
    </DisclosurePanel>
  );
};

export default function GlobalNavbar() {
  //used for responsive menu items
  const activeClass =
    "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white";
  const defaultClass =
    "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center px-2 lg:px-0">
            <div className="flex-shrink-0">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden lg:ml-6 lg:block">
              <div className="flex space-x-4">
                {menuItems.map((item) => {
                  return (
                    <NavLink
                      key={item.name}
                      className={({ isActive }) => [
                        isActive ? activeClass : defaultClass,
                      ]}
                      to={item.path}
                      end={item.end}
                    >
                      {item.text}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <Searchbar />
          </div>
          {/*Mobile Menu Button here*/}
          <MobileMenuHamburgerButton />
        </div>
      </div>
      <MobileMenuPanel />
    </Disclosure>
  );
}