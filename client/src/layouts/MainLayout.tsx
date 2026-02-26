import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export function MainLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-medical-green-100 selection:text-medical-green-900 flex flex-col">
      <Navbar activeTab={pathname} />

      {/* Main Content Area - pt-32 to account for Utility Bar (40px) + Navbar (64px) */}
      <main className="relative transition-all duration-500 pt-32 flex-grow">
        <Outlet />
      </main>

      <Footer />

      {/* Global Background Pattern */}
      <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#064e3b_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>
    </div>
  );
}