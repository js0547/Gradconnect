import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import {
  Home, Search, Users, BookOpen, MessageCircle, Briefcase, User,
  Bell, Menu, X, ChevronLeft, Settings, LogOut, Zap, Plus,
  GraduationCap
} from "lucide-react";
import { NOTIFICATIONS } from "./mockData";

const NAV_ITEMS = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Search, label: "Discover", path: "/discovery" },
  { icon: Users, label: "Collaborate", path: "/collaborate" },
  { icon: BookOpen, label: "Mentorship", path: "/mentorship" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: Briefcase, label: "Recruiter", path: "/recruiter" },
];

const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[#1E3A8A] text-white transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-64"
        } flex-shrink-0 shadow-xl`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#14B8A6] rounded-lg flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>
              <span className="text-white" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                GRAD<span className="text-[#14B8A6]">CONNECT</span>
              </span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 bg-[#14B8A6] rounded-lg flex items-center justify-center mx-auto">
              <GraduationCap size={18} className="text-white" />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-white/60 hover:text-white transition-colors p-1 rounded"
          >
            <ChevronLeft size={18} className={`transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* User Mini Profile */}
        {!sidebarCollapsed && (
          <div
            className="p-4 border-b border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => navigate("/profile")}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-[#14B8A6] flex-shrink-0">
                <User size={18} className="text-gray-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm truncate" style={{ fontWeight: 600 }}>Marcus Chen</p>
                <p className="text-white/60 text-xs truncate">Alumni • Stanford</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <div className="w-2 h-2 bg-[#14B8A6] rounded-full"></div>
              <span className="text-[#14B8A6] text-xs">Available for collab</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${isActive
                    ? "bg-[#14B8A6] text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm" style={{ fontWeight: 500 }}>{label}</span>
                )}
                {path === "/messages" && !sidebarCollapsed && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <button className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all w-full`}>
            <Settings size={20} />
            {!sidebarCollapsed && <span className="text-sm">Settings</span>}
          </button>
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all w-full`}
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#1E3A8A] text-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#14B8A6] rounded-lg flex items-center justify-center">
                  <GraduationCap size={18} />
                </div>
                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                  GRAD<span className="text-[#14B8A6]">CONNECT</span>
                </span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 border-b border-white/10" onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-[#14B8A6] flex-shrink-0">
                  <User size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-white text-sm" style={{ fontWeight: 600 }}>Marcus Chen</p>
                  <p className="text-white/60 text-xs">Alumni • Stanford</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                      isActive ? "bg-[#14B8A6] text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span style={{ fontWeight: 500 }}>{label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-6 py-3 flex items-center gap-4 flex-shrink-0 shadow-sm">
          <button
            className="md:hidden text-gray-600 hover:text-[#1E3A8A] transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 hidden sm:block">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search people, projects, skills..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {/* Quick Create */}
            <button className="hidden md:flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#1E3A8A]/90 transition-colors">
              <Plus size={16} />
              Create
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 text-gray-500 hover:text-[#1E3A8A] hover:bg-gray-50 rounded-xl transition-all"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>Notifications</h3>
                    <span className="text-xs text-[#14B8A6] cursor-pointer">Mark all read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {NOTIFICATIONS.map((notif) => (
                      <div key={notif.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notif.read ? "bg-blue-50/50" : ""}`}>
                        <div className="flex items-start gap-3">
                          {notif.avatar ? (
                            <img src={notif.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#14B8A6]/20 flex items-center justify-center flex-shrink-0">
                              <Zap size={14} className="text-[#14B8A6]" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-700 leading-relaxed">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                          {!notif.read && <div className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-1 flex-shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 text-center">
                    <span className="text-xs text-[#1E3A8A] cursor-pointer">View all notifications</span>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <button onClick={() => navigate("/profile")} className="w-9 h-9 rounded-full bg-gray-200 border-2 border-[#14B8A6] flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-gray-400" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden bg-white border-t border-gray-100 px-2 py-2 flex items-center justify-around flex-shrink-0 shadow-t-lg">
          {[
            { icon: Home, label: "Home", path: "/dashboard" },
            { icon: Search, label: "Discover", path: "/discovery" },
            { icon: Users, label: "Projects", path: "/collaborate" },
            { icon: MessageCircle, label: "Messages", path: "/messages" },
            { icon: User, label: "Profile", path: "/profile" },
          ].map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={path}
                to={path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                  isActive ? "text-[#1E3A8A]" : "text-gray-400"
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span style={{ fontSize: "0.6rem", fontWeight: isActive ? 600 : 400 }}>{label}</span>
                {path === "/messages" && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}