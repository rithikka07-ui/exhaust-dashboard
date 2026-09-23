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
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand / Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
              <Flame className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-slate-900 text-base">Smart Exhaust</span>
                <span className="text-[10px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                IoT Kitchen Automation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 lg:hidden"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-600 rounded-r-full" />
                      )}
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-emerald-600" : "text-slate-500 group-hover:text-slate-700"
                        }`}
                      />
                      <span className={isActive ? "font-bold text-emerald-900" : ""}>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.pulse && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                        </span>
                      )}
                      {badgeValue && (
                        <span
                          className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            item.badgeColor === "red"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
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
        <div className="p-3 mx-3 mb-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              System Telemetry
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              ONLINE
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px]">Raspberry Pi</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">● Connected</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px]">Firebase RTDB</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">● Connected</span>
            </div>

            <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Server className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px]">MQTT Broker</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">1883 OK</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
