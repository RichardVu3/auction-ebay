/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as DashboardWatchlistImport } from './routes/dashboard.watchlist'
import { Route as DashboardSummaryImport } from './routes/dashboard.summary'
import { Route as DashboardAuctionsImport } from './routes/dashboard.auctions'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const DashboardWatchlistRoute = DashboardWatchlistImport.update({
  id: '/watchlist',
  path: '/watchlist',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSummaryRoute = DashboardSummaryImport.update({
  id: '/summary',
  path: '/summary',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardAuctionsRoute = DashboardAuctionsImport.update({
  id: '/auctions',
  path: '/auctions',
  getParentRoute: () => DashboardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/auctions': {
      id: '/dashboard/auctions'
      path: '/auctions'
      fullPath: '/dashboard/auctions'
      preLoaderRoute: typeof DashboardAuctionsImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/summary': {
      id: '/dashboard/summary'
      path: '/summary'
      fullPath: '/dashboard/summary'
      preLoaderRoute: typeof DashboardSummaryImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/watchlist': {
      id: '/dashboard/watchlist'
      path: '/watchlist'
      fullPath: '/dashboard/watchlist'
      preLoaderRoute: typeof DashboardWatchlistImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

interface DashboardRouteChildren {
  DashboardAuctionsRoute: typeof DashboardAuctionsRoute
  DashboardSummaryRoute: typeof DashboardSummaryRoute
  DashboardWatchlistRoute: typeof DashboardWatchlistRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardAuctionsRoute: DashboardAuctionsRoute,
  DashboardSummaryRoute: DashboardSummaryRoute,
  DashboardWatchlistRoute: DashboardWatchlistRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/dashboard/auctions': typeof DashboardAuctionsRoute
  '/dashboard/summary': typeof DashboardSummaryRoute
  '/dashboard/watchlist': typeof DashboardWatchlistRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/dashboard/auctions': typeof DashboardAuctionsRoute
  '/dashboard/summary': typeof DashboardSummaryRoute
  '/dashboard/watchlist': typeof DashboardWatchlistRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/dashboard/auctions': typeof DashboardAuctionsRoute
  '/dashboard/summary': typeof DashboardSummaryRoute
  '/dashboard/watchlist': typeof DashboardWatchlistRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/about'
    | '/dashboard/auctions'
    | '/dashboard/summary'
    | '/dashboard/watchlist'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/dashboard'
    | '/about'
    | '/dashboard/auctions'
    | '/dashboard/summary'
    | '/dashboard/watchlist'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/about'
    | '/dashboard/auctions'
    | '/dashboard/summary'
    | '/dashboard/watchlist'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  DashboardRoute: typeof DashboardRouteWithChildren
  AboutLazyRoute: typeof AboutLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  DashboardRoute: DashboardRouteWithChildren,
  AboutLazyRoute: AboutLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/about"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/auctions",
        "/dashboard/summary",
        "/dashboard/watchlist"
      ]
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/dashboard/auctions": {
      "filePath": "dashboard.auctions.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/summary": {
      "filePath": "dashboard.summary.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/watchlist": {
      "filePath": "dashboard.watchlist.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
