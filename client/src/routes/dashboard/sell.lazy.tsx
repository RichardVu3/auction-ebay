import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/sell')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /dashboard/sell!'
}
