import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { auth } from "./utils/auth";

export const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultErrorComponent: ({ error }) => {
    <div>{error}</div>;
  },
  context: {
    auth: undefined!,
    queryClient,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} context={{ auth }} />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>,
  );
}
