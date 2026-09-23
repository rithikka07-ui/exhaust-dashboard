import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Bell,
  Clock,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";

export default function Header({ onToggleSidebar }) {
  const {
    activeAlertsCount,
    isLiveSimulation,
    setIsLiveSimulation,
    currentTotalPower,
    theme,
    toggleTheme,
  } = useHoods();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-xs transition-colors duration-200">
      {/* Left: Mobile hamburger + Titles */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight flex items-center gap-2">
            Smart Kitchen Exhaust Management
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-300 rounded font-semibold">
              Live Feed
            </span>
          </h1>
          <p className="text-xs text-slate-500 hidden xs:block">
            Real-time monitoring & energy optimization
          </p>
        </div>
      </div>

      {/* Right side controls & indicators */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Total Load Pill */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs">
          <span className="text-slate-500 uppercase font-semibold text-[10px] tracking-wider">Total Load:</span>
          <span className="font-mono font-bold text-emerald-700">{currentTotalPower} kW</span>
        </div>

        {/* Live Simulation Pulse Toggle */}
        <button
          onClick={() => setIsLiveSimulation(!isLiveSimulation)}
          title={isLiveSimulation ? "Click to pause IoT simulation" : "Click to resume IoT simulation"}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
            isLiveSimulation
              ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs"
              : "bg-slate-100 text-slate-500 border-slate-300"
          }`}
        >
          <span className="relative flex h-2 w-2">
            {isLiveSimulation && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isLiveSimulation ? "bg-emerald-600" : "bg-slate-400"
              }`}
            ></span>
          </span>
          <span className="tracking-wide">{isLiveSimulation ? "LIVE" : "PAUSED"}</span>
        </button>

        {/* Theme Toggle Button (Light / Dark) */}
        <button
          onClick={toggleTheme}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to White Theme"}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4 text-slate-700" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
        </button>

        {/* Auto-updating Clock */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 font-mono text-xs text-slate-700">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-bold text-slate-900 tracking-wider">{formattedTime}</span>
          <span className="text-slate-500 text-[11px] border-l border-slate-300 pl-2">
            {formattedDate}
          </span>
        </div>

        {/* Notification Bell */}
        <Link
          to="/alerts"
          className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          title={`${activeAlertsCount} active alerts`}
        >
          <Bell className="w-5 h-5" />
          {activeAlertsCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-mono font-bold text-white shadow-xs">
              {activeAlertsCount}
            </span>
          )}
        </Link>

        {/* User Profile / Control Room Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center justify-center text-xs font-bold text-emerald-800 font-mono shadow-xs">
            CR
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-none">Chief Engineer</div>
            <div className="text-[10px] text-emerald-700 font-mono flex items-center gap-1 mt-0.5 font-medium">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Room Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
