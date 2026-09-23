import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Bell,
  Radio,
  Clock,
  ShieldCheck,
  Power,
  SlidersHorizontal,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";

export default function Header({ onToggleSidebar }) {
  const { activeAlertsCount, isLiveSimulation, setIsLiveSimulation, currentTotalPower } = useHoods();
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
    <header className="sticky top-0 z-30 h-16 bg-industrial-900/95 backdrop-blur border-b border-industrial-700/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger + Titles */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-1 text-zinc-400 hover:text-white rounded-lg hover:bg-industrial-800 lg:hidden transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight flex items-center gap-2">
            Smart Kitchen Exhaust Management
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded font-semibold">
              Live Feed
            </span>
          </h1>
          <p className="text-xs text-zinc-400 hidden xs:block">
            Real-time monitoring & energy optimization
          </p>
        </div>
      </div>

      {/* Right side controls & indicators */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Total Load Pill */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-industrial-850 border border-industrial-700 text-xs">
          <span className="text-zinc-400 uppercase font-semibold text-[10px] tracking-wider">Total Load:</span>
          <span className="font-mono font-bold text-emerald-400">{currentTotalPower} kW</span>
        </div>

        {/* Live Simulation Pulse Toggle */}
        <button
          onClick={() => setIsLiveSimulation(!isLiveSimulation)}
          title={isLiveSimulation ? "Click to pause IoT simulation" : "Click to resume IoT simulation"}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all border ${
            isLiveSimulation
              ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/50 shadow-subtle-glow"
              : "bg-industrial-800 text-zinc-400 border-industrial-600"
          }`}
        >
          <span className="relative flex h-2 w-2">
            {isLiveSimulation && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isLiveSimulation ? "bg-emerald-400" : "bg-zinc-500"
              }`}
            ></span>
          </span>
          <span className="tracking-wide">{isLiveSimulation ? "LIVE" : "PAUSED"}</span>
        </button>

        {/* Auto-updating Clock */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-industrial-950 border border-industrial-700 font-mono text-xs text-zinc-300">
          <Clock className="w-3.5 h-3.5 text-zinc-400" />
          <span className="font-bold text-white tracking-wider">{formattedTime}</span>
          <span className="text-zinc-400 text-[11px] border-l border-industrial-700 pl-2">
            {formattedDate}
          </span>
        </div>

        {/* Notification Bell */}
        <Link
          to="/alerts"
          className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-industrial-800 transition-colors"
          title={`${activeAlertsCount} active alerts`}
        >
          <Bell className="w-5 h-5" />
          {activeAlertsCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-mono font-bold text-white shadow-alert-glow">
              {activeAlertsCount}
            </span>
          )}
        </Link>

        {/* User Profile / Control Room Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-industrial-700">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-industrial-700 to-industrial-600 border border-industrial-600 flex items-center justify-center text-xs font-bold text-emerald-400 font-mono shadow-sm">
            CR
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-white leading-none">Chief Engineer</div>
            <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-2.5 h-2.5" /> Room Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
