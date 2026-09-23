import React, { useState, useMemo } from "react";
import {
  BellRing,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Filter,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 sm:p-5 rounded-xl bg-industrial-900 border border-industrial-750">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <BellRing className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Safety & Diagnostic Incident Management
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time threshold breaches, abnormal power spikes, and sensor connectivity dropouts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-industrial-800 text-zinc-200 border border-industrial-700">
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
              ? "bg-industrial-800 border-zinc-500 text-white shadow-sm"
              : "bg-industrial-900 border-industrial-750 text-zinc-400 hover:text-white"
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider">All Incidents</div>
          <div className="font-mono text-xl font-bold text-white mt-1">{alerts.length} Total</div>
        </button>

        <button
          onClick={() => setFilterSeverity("CRITICAL")}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterSeverity === "CRITICAL"
              ? "bg-rose-950/40 border-rose-500 text-rose-300 shadow-alert-glow/20"
              : "bg-industrial-900 border-industrial-750 text-zinc-400 hover:text-rose-300"
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider text-rose-400 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Critical
          </div>
          <div className="font-mono text-xl font-bold text-rose-400 mt-1">{criticalCount} Active</div>
        </button>

        <button
          onClick={() => setFilterSeverity("WARNING")}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterSeverity === "WARNING"
              ? "bg-amber-950/40 border-amber-500 text-amber-300"
              : "bg-industrial-900 border-industrial-750 text-zinc-400 hover:text-amber-300"
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Warning
          </div>
          <div className="font-mono text-xl font-bold text-amber-400 mt-1">{warningCount} Active</div>
        </button>

        <button
          onClick={() => setFilterSeverity("INFORMATION")}
          className={`p-3 rounded-xl border text-left transition-all ${
            filterSeverity === "INFORMATION"
              ? "bg-cyan-950/40 border-cyan-500 text-cyan-300"
              : "bg-industrial-900 border-industrial-750 text-zinc-400 hover:text-cyan-300"
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 flex items-center gap-1">
            <Info className="w-3.5 h-3.5" /> Information
          </div>
          <div className="font-mono text-xl font-bold text-cyan-400 mt-1">{infoCount} Logged</div>
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 rounded-xl bg-industrial-900 border border-industrial-750 text-zinc-400 font-mono text-xs">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
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
