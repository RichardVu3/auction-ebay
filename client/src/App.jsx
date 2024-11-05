import { Outlet } from "react-router-dom";
import GlobalNavbar from "./components/GlobalNavbar";
export default function App() {
  return (
    <div>
      <GlobalNavbar />
      <Outlet />
    </div>
  );
}
