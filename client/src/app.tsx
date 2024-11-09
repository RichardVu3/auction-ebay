import { Outlet } from "react-router-dom";
import { Avatar } from "./components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "./components/dropdown";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "./components/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarDivider,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "./components/sidebar";
import { StackedLayout } from "./components/stacked-layout";
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Input, InputGroup } from "./components/input";
const navItems = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "Sell", url: "/dashboard/sell" },
];

function TeamDropdownMenu() {
  return (
    <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
      <DropdownItem to="/teams/1/settings">
        <Cog8ToothIcon />
        <DropdownLabel>Settings</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem to="/teams/1">
        <Avatar slot="icon" src="/tailwind-logo.svg" />
        <DropdownLabel>Tailwind Labs</DropdownLabel>
      </DropdownItem>
      <DropdownItem to="/teams/2">
        <Avatar
          slot="icon"
          initials="WC"
          className="bg-purple-500 text-white"
        />
        <DropdownLabel>Workcation</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem to="/team../create">
        <PlusIcon />
        <DropdownLabel>New team&hellip;</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

const AppNavbar = () => {
  return (
    <Navbar>
      <NavbarSection>
        <NavbarItem className="max-sm:hidden pr-2">
          <Avatar src="/tailwind-logo.svg" />
          <NavbarLabel>Tailwind Labs</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
      {/*Searchbar*/}
      <NavbarSpacer>
        <InputGroup>
          <MagnifyingGlassIcon />
          <Input type="search" placeholder="Search" />
        </InputGroup>
      </NavbarSpacer>
      {/*Navitems*/}
      <NavbarSection className="max-lg:hidden">
        {navItems.map(({ label, url }) => (
          <NavbarItem key={label} to={url}>
            {label}
          </NavbarItem>
        ))}
      </NavbarSection>
      {/* Right End */}
      <NavbarSection>
        <NavbarItem to="/inbox" aria-label="Inbox">
          <HeartIcon />
        </NavbarItem>
        <Dropdown>
          <DropdownButton as={NavbarItem} className="max-lg:hidden">
            <Avatar src="/profile-photo.jpg" square />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="bottom end">
            <DropdownItem to="/my-profile">
              <UserIcon />
              <DropdownLabel>My profile</DropdownLabel>
            </DropdownItem>
            <DropdownItem to="/settings">
              <Cog8ToothIcon />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem to="/privacy-policy">
              <ShieldCheckIcon />
              <DropdownLabel>Privacy policy</DropdownLabel>
            </DropdownItem>
            <DropdownItem to="/share-feedback">
              <LightBulbIcon />
              <DropdownLabel>Share feedback</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem to="/logout">
              <ArrowRightStartOnRectangleIcon />
              <DropdownLabel>Sign out</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarSection>
    </Navbar>
  );
};

const sidebarUserNavItems = [
  { label: "Dashboard", url: "/dashboard" },
  { label: "Watchlist", url: "/dashboard/watchlist" },
  { label: "Auctions", url: "/dashboard/auctions" },
  { label: "Sell", url: "/dashboard/sell" },
];

const sidebarCategoriesNavItems = [
  { label: "Clothing", url: "categories/clothing" },
  { label: "Motors", url: "/categories/motors" },
  { label: "Collectibles", url: "/categories/collectibles" },
  { label: "Electronics", url: "/categories/electronics" },
  { label: "Home & Garden", url: "/categories/home-garden" },
];
const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Dropdown>
          <DropdownButton as={SidebarItem} className="lg:mb-2.5">
            <Avatar src="/tailwind-logo.svg" />
            <SidebarLabel>Tailwind Labs</SidebarLabel>
            <ChevronDownIcon />
          </DropdownButton>
          <TeamDropdownMenu />
        </Dropdown>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          {sidebarUserNavItems.map(({ label, url }) => (
            <SidebarItem key={label} to={url}>
              {label}
            </SidebarItem>
          ))}
        </SidebarSection>
        <SidebarDivider />
        <SidebarSection>
          {sidebarCategoriesNavItems.map(({ label, url }) => (
            <SidebarItem key={label} to={url}>
              {label}
            </SidebarItem>
          ))}
        </SidebarSection>

        <SidebarDivider />
      </SidebarBody>
    </Sidebar>
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StackedLayout navbar={<AppNavbar />} sidebar={<AppSidebar />}>
      {children}
    </StackedLayout>
  );
};
export default function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
