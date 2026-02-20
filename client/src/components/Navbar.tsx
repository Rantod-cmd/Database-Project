import { useState, useEffect } from "react";
import type { NavItem, NavbarProps } from "@shared/types/components/types";
import { Map, LayoutDashboard, Hospital, PhoneCall, FileText, User } from "lucide-react";

const isLogin = false;

const navItems: NavItem[] = [
  {
    label: "แผนที่โรคระบาด",
    href: "/map",
    icon: <Map className="w-4 h-4" />,
  },
  {
    label: "ข้อมูลตามจังหวัด",
    href: "/provinces",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "โรงพยาบาลในเครือ",
    href: "/statistics",
    icon: <Hospital className="w-4 h-4" />,
  },
  {
    label: "ช่องทางการติดต่อ",
    href: "/alerts",
    icon: <PhoneCall className="w-4 h-4" />,
  },
  {
    label: "แจ้งผู้ป่วย",
    href: "/HealthForm",
    icon: <FileText className="w-4 h-4" />,
  },
];

export default function Navbar({ activeTab = "/" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="w-full bg-white border-b border-primary font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-transform duration-200 group-hover:scale-105 bg-primary">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-tight text-primary">
                Health Monitor
              </div>
              <div className="text-[10px] font-medium text-secondary-medium">
                ระบบติดตามผู้ป่วย
              </div>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-secondary hover:bg-primary-surface/60"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isLogin ? (
              <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl transition-colors duration-200 border-[1.5px] border-primary-surface hover:bg-primary-surface/60">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold bg-primary-light">
                  ส
                </div>
                <span className="text-sm font-medium text-secondary">สธ.</span>
                <svg
                  className="w-3.5 h-3.5 text-secondary-medium"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            ) : (
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 bg-white border border-gray-400 hover:bg-gray-50 text-secondary">
                <div className="bg-gray-100 p-1 rounded-full border border-gray-500 text-secondary-medium flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">เข้าสู่ระบบ</span>
              </button>
            )}
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl transition-colors hover:bg-primary-surface/60"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`block w-5 h-0.5 rounded-full transition-all duration-300 bg-primary ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 rounded-full transition-all duration-300 bg-primary ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 rounded-full transition-all duration-300 bg-primary ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}