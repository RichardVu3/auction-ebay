import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./app";
import ErrorPage from "./error-page";
import DashboardPage from "./routes/dashboard/dashboard-page";
import AuctionsSummary from "./routes/dashboard/dashboard-auctions";
import Index from "./routes/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route path="dashboard" element={<DashboardPage />}>
          <Route path="auctions" element={<AuctionsSummary />} />

          <Route path="watchlist" element={<DashboardPage />} />

          <Route path="orders" element={<DashboardPage />} />

          <Route path="sell" element={<DashboardPage />} />
        </Route>

        <Route path="categories/:categoryid" element={<DashboardPage />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
