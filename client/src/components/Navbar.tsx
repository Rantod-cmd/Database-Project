import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Clock,
  LogIn,
  ShieldAlert,
  LogOut,
  BarChart2,
} from "lucide-react";
import { useAuthStore } from "../stores/authStore";

interface NavbarProps {
  activeTab?: string;
}

const Navbar = ({ activeTab }: NavbarProps) => {
  const { hospital, logout } = useAuthStore();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const currentActiveTab = activeTab || pathname;
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "แผนที่โรคระบาด", path: "/map" },
    { name: "ข้อมูลรายจังหวัด", path: "/provinces" },
    { name: "โรงพยาบาลเครือข่าย", path: "/hospitals" },
    { name: "รายงานผู้ป่วย", path: "/reporting" },
    { name: "ติดต่อกองควบคุมโรค", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar - Dark Green */}
      <div className="bg-medical-green-900 text-white/90 py-2 px-8 border-b border-white/5 hidden md:block transition-all duration-300">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[11px] font-bold tracking-wider uppercase">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-medical-green-100" />
              <span>Hotline: 1422 (24 Hours)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-medical-green-100" />
              <span>info@ddc.mail.go.th</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 border-r border-white/10 pr-6">
              <Clock className="w-3.5 h-3.5 text-medical-green-100" />
              <span>Mon - Fri: 08:30 - 16:30</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="hover:text-white transition-colors">
                Language: EN
              </button>
              <button className="hover:text-white transition-colors">TH</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Solid White */}
      <nav
        className={`transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white py-3 shadow-md border-slate-200"
            : "bg-white py-5 border-slate-100"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group shrink-0">
            <div className="w-12 h-12 rounded-lg bg-medical-green-900 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-black leading-tight uppercase tracking-tight text-slate-900">
                National Health Portal
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-medical-green-600 mt-0.5">
                Disease Control • Thailand
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentActiveTab === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-black uppercase tracking-wider transition-all relative pb-1 group ${
                    isActive
                      ? "text-medical-green-700"
                      : "text-slate-600 hover:text-medical-green-600"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[3px] bg-medical-green-600 transition-transform duration-300 origin-left rounded-full ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {hospital ? (
              <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <button
                  onClick={() => navigate("/statistics")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-[12px] font-black uppercase tracking-widest transition-all ${
                    currentActiveTab === "/statistics"
                      ? "bg-medical-green-900 text-white shadow-md"
                      : "text-slate-600 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <BarChart2
                    className={`w-4 h-4 ${
                      currentActiveTab === "/statistics"
                        ? "text-white"
                        : "text-medical-green-600"
                    }`}
                  />
                  สถิติภายใน
                </button>
                <div className="w-[1px] h-6 bg-slate-200 mx-1" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-red-600 rounded-md text-[12px] font-black uppercase tracking-widest transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="flex items-center gap-2.5 px-6 py-3 bg-medical-green-900 text-white rounded-md text-[12px] font-black uppercase tracking-widest shadow-lg hover:bg-medical-green-800 transition-all active:scale-95"
                onClick={() => navigate("/login")}
              >
                <LogIn className="w-4 h-4" />
                Internal Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
