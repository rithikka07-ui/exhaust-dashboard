import React, { useState, useMemo } from "react";
import {
  BellRing,
  AlertCircle,
  AlertTriangle,
  Info,
  ShieldCheck,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";
import AlertCard from "../components/AlertCard";

export default function Alerts() {
  const { alerts, activeAlertsCount } = useHoods();
  const [filterSeverity, setFilterSeverity] = useState("ALL");

  const criticalCount = alerts.filter((a) => a.severity === "CRITICAL" && a.status !== "RESOLVED").length;
  const warningCount = alerts.filter((a) => a.severity === "WARNING" && a.status !== "RESOLVED").length;
  const infoCount = alerts.filter((a) => a.severity === "INFORMATION").length;

  const filteredAlerts = useMemo(() => {
    if (filterSeverity === "ALL") return alerts;
    return alerts.filter((a) => a.severity === filterSeverity);
  }, [alerts, filterSeverity]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
              <BellRing className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Safety & Diagnostic Incident Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time threshold breaches, abnormal power spikes, and sensor connectivity dropouts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs">
            {activeAlertsCount} Unresolved Incidents
          </span>
        </div>
      </div>

      {/* Filter Tabs & Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setFilterSeverity("ALL")}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterSeverity === "ALL"
              ? "bg-slate-100 border-slate-400 text-slate-900 shadow-2xs"
              : "bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-2xs"
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider">All Incidents</div>
          <div className="font-mono text-xl font-bold text-slate-900 mt-1">{alerts.length} Total</div>
        </button>

        <button
          onClick={() => setFilterSeverity("CRITICAL")}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterSeverity === "CRITICAL"
              ? "bg-rose-50 border-rose-300 text-rose-800 shadow-2xs"
              : "bg-white border-slate-200 text-slate-500 hover:text-rose-700 shadow-2xs"
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider text-rose-700 flex items-center gap-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Critical
          </div>
          <div className="font-mono text-xl font-bold text-rose-700 mt-1">{criticalCount} Active</div>
        </button>

        <button
          onClick={() => setFilterSeverity("WARNING")}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterSeverity === "WARNING"
              ? "bg-amber-50 border-amber-300 text-amber-800 shadow-2xs"
              : "bg-white border-slate-200 text-slate-500 hover:text-amber-700 shadow-2xs"
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider text-amber-700 flex items-center gap-1 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Warning
          </div>
          <div className="font-mono text-xl font-bold text-amber-700 mt-1">{warningCount} Active</div>
        </button>

        <button
          onClick={() => setFilterSeverity("INFORMATION")}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterSeverity === "INFORMATION"
              ? "bg-sky-50 border-sky-300 text-sky-800 shadow-2xs"
              : "bg-white border-slate-200 text-slate-500 hover:text-sky-700 shadow-2xs"
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider text-sky-700 flex items-center gap-1 font-semibold">
            <Info className="w-3.5 h-3.5 text-sky-600" /> Information
          </div>
          <div className="font-mono text-xl font-bold text-sky-700 mt-1">{infoCount} Logged</div>
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 rounded-xl bg-white border border-slate-200 text-slate-500 font-mono text-xs shadow-xs">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-80" />
            No alerts found in this severity category. All monitored thresholds are nominal.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        )}
      </div>
    </div>
  );
}
