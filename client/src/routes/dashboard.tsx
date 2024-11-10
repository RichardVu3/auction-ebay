import {
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { Tabs } from '@mantine/core'
import { Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate({})
  const tabItems = [
    {
      name: 'Summary',
      to: '/summary',
    },
    {
      name: 'Auctions',
      to: '/auctions',
    },
    {
      name: 'Watchlist',
      to: '/watchlist',
    },
    {
      name: 'Sell',
      to: '/sell',
    },
  ]
  console.log(location)
  return (
    <Tabs
      defaultValue="summary"
      orientation="vertical"
      value={location.pathname}
      onChange={(value) => {
        navigate({ to: `/dashboard/${value}` })
      }}
    >
      <Tabs.List>
        {tabItems.map((tab) => {
          return (
            <Tabs.Tab key={tab.name} value={tab.to}>
              {tab.name}
            </Tabs.Tab>
          )
        })}
      </Tabs.List>
      <Outlet />
    </Tabs>
  )
}
