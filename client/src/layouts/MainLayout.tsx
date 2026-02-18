import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export function MainLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar activeTab={pathname} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}