import { MouseEventHandler, useState } from "react";
import viteLogo from "/vite.svg";
import cx from "clsx";
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  EnvelopeIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  PauseIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Autocomplete,
  Avatar,
  Burger,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Menu,
  Divider,
  Center,
  Box,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { Link } from "@tanstack/react-router";
import classes from "./HeaderMegaMenu.module.css";

const user = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};
const mockdata = [
  {
    icon: BellIcon,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: BellIcon,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: BellIcon,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: BellIcon,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: BellIcon,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: BellIcon,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];
const ProfileDropdown = () => {
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group gap={7}>
            <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.name}
            </Text>
            <ChevronDownIcon
              style={{ width: rem(12), height: rem(12) }}
              stroke={"1.5"}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <HeartIcon
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
              stroke={"1.5"}
            />
          }
        >
          Liked posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <StarIcon
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[6]}
              stroke={"1.5"}
            />
          }
        >
          Saved posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <EnvelopeIcon
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
              stroke={"1.5"}
            />
          }
        >
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          leftSection={
            <Cog8ToothIcon
              style={{ width: rem(16), height: rem(16) }}
              stroke={"1.5"}
            />
          }
        >
          Account settings
        </Menu.Item>
        <Menu.Item
          leftSection={
            <ArrowRightStartOnRectangleIcon
              style={{ width: rem(16), height: rem(16) }}
              stroke={"1.5"}
            />
          }
        >
          Change account
        </Menu.Item>
        <Menu.Item
          leftSection={
            <ArrowRightStartOnRectangleIcon
              style={{ width: rem(16), height: rem(16) }}
              stroke={"1.5"}
            />
          }
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={
            <PauseIcon
              style={{ width: rem(16), height: rem(16) }}
              stroke={"1.5"}
            />
          }
        >
          Pause subscription
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={
            <TrashIcon
              style={{ width: rem(16), height: rem(16) }}
              stroke={"1.5"}
            />
          }
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const HeaderMegaMenu = ({
  toggleDrawer,
  closeDrawer,
  drawerOpened,
}: {
  drawerOpened: boolean;
  toggleDrawer: MouseEventHandler<HTMLButtonElement>;
  closeDrawer: () => void;
}) => {
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem(22), height: rem(22) }}
            color={theme.colors.blue[6]}
          />
        </ThemeIcon>

        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box id="header-box" mb={120}>
      <header id="header-inner" className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Avatar src={viteLogo} />
          </Group>
          <Group style={{ flex: 1 }}>
            <Autocomplete
              style={{ flex: 1 }}
              placeholder="Search"
              leftSection={
                <MagnifyingGlassIcon
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={"1.5"}
                />
              }
              data={[
                "React",
                "Angular",
                "Vue",
                "Next.js",
                "Riot.js",
                "Svelte",
                "Blitz.js",
              ]}
              visibleFrom="xs"
            />
          </Group>

          <Group h="100%" gap={0} visibleFrom="sm">
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Link to="/" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Shop by Categories
                    </Box>
                    <ChevronDownIcon
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>

            <Link to="/dashboard/summary" className={classes.link}>
              Dashboard
            </Link>
            <Link to="/dashboard/sell" className={classes.link}>
              Sell
            </Link>
            <Link to="/dashboard/auctions" className={classes.link}>
              Auctions
            </Link>
          </Group>
          <Group visibleFrom="sm">
            <ProfileDropdown />
          </Group>
          {/*<Group visibleFrom="sm">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>*/}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link to="/dashboard/summary" className={classes.link}>
            Dashboard
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <ChevronDownIcon
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <ProfileDropdown />
            {/*<Button variant="default">Log in</Button>
            <Button>Sign up</Button>*/}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default HeaderMegaMenu;
