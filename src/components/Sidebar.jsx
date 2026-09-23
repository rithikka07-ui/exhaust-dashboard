import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Fan,
  Activity,
  Zap,
  BellRing,
  History,
  Settings,
  Server,
  Cpu,
  Database,
  Flame,
  X,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/hoods", label: "Kitchen Hoods", icon: Fan, badgeKey: "activeHoods" },
  { path: "/monitoring", label: "Live Monitoring", icon: Activity, pulse: true },
  { path: "/analytics", label: "Energy Analytics", icon: Zap },
  { path: "/alerts", label: "Alerts", icon: BellRing, badgeKey: "activeAlertsCount", badgeColor: "red" },
  { path: "/history", label: "Historical Data", icon: History },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const { activeHoods, activeAlertsCount } = useHoods();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-industrial-900 border-r border-industrial-700/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-industrial-700/80 bg-industrial-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-subtle-glow">
              <Flame className="w-5 h-5 animate-pulse-fast text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base">Smart Exhaust</span>
                <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
                IoT Kitchen Automation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-industrial-800 lg:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Control Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            let badgeValue = null;
            if (item.badgeKey === "activeHoods") badgeValue = `${activeHoods}/12`;
            if (item.badgeKey === "activeAlertsCount" && activeAlertsCount > 0) badgeValue = activeAlertsCount;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-industrial-800 text-white border border-emerald-500/40 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-industrial-850 border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-400 rounded-r-full shadow-subtle-glow" />
                      )}
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-emerald-400" : "text-zinc-400 group-hover:text-zinc-200"
                        }`}
                      />
                      <span className={isActive ? "font-semibold text-white" : ""}>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.pulse && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                      {badgeValue && (
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            item.badgeColor === "red"
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : "bg-industrial-700 text-zinc-300"
                          }`}
                        >
                          {badgeValue}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom SYSTEM STATUS Block */}
        <div className="p-3 mx-3 mb-4 rounded-xl bg-industrial-950/70 border border-industrial-700/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              System Telemetry
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ONLINE
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between py-1 px-2 rounded bg-industrial-900/80 border border-industrial-750">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px]">Raspberry Pi</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">● Connected</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded bg-industrial-900/80 border border-industrial-750">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px]">Firebase RTDB</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">● Connected</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded bg-industrial-900/80 border border-industrial-750">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Server className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px]">MQTT Broker</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">1883 OK</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
