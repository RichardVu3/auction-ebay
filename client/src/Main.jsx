import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Index from "./routes/Index";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route path="auctions" element={<div>My Auctions</div>} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
