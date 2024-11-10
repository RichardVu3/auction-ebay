import { createFileRoute } from '@tanstack/react-router'
import HeroContentLeft from '../components/hero'
export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return <HeroContentLeft />
}
