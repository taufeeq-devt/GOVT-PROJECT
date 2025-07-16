import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, User, Settings, LogOut, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import NotificationsPanel from "./dashboard/NotificationsPanel";

// Accept className as a prop
export default function Topbar({ onProfile, onSettings, onLogout, className = "" }) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`flex items-center justify-between px-8 py-4 bg-gradient-to-r from-[#16204d] to-[#15192c] border-b border-slate-800 shadow-md dark:bg-govt-dark dark:border-govt-dark/80 rounded-b-2xl flex-shrink-0 ${className}`}>
      <div className="flex-1">
        <div className="relative w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </span>
          <input
            type="text"
            placeholder="Search materials, updates..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#23294a] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <NotificationsPanel />
        <ThemeToggle />
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-[#23294a] transition"
            onClick={() => setDropdown((d) => !d)}
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-700 flex items-center justify-center">
              <User className="w-5 h-5 text-white" strokeWidth={1.5} />
            </span>
            <span className="text-gray-200 font-semibold">Supplier</span>
            <ChevronDown className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          </button>
          {dropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#23294a] rounded-lg shadow-lg border border-gray-700 z-50">
              <button className="flex items-center w-full px-4 py-3 gap-2 text-gray-200 hover:bg-[#1A2536] transition rounded-t-lg" onClick={() => { setDropdown(false); onProfile && onProfile(); }}>
                <User className="w-5 h-5 text-gray-400" strokeWidth={1.5} /> View Profile
              </button>
              <button className="flex items-center w-full px-4 py-3 gap-2 text-gray-200 hover:bg-[#1A2536] transition" onClick={() => { setDropdown(false); onSettings && onSettings(); }}>
                <Settings className="w-5 h-5 text-gray-400" strokeWidth={1.5} /> Settings
              </button>
              <button className="flex items-center w-full px-4 py-3 gap-2 text-red-400 hover:bg-red-900/30 transition rounded-b-lg" onClick={() => { setDropdown(false); onLogout && onLogout(); }}>
                <LogOut className="w-5 h-5 text-red-400" strokeWidth={1.5} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 