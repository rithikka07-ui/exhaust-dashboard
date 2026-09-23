import React from "react";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  Check,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";

export default function AlertCard({ alert }) {
  const { acknowledgeAlert, resolveAlert } = useHoods();

  const isCritical = alert.severity === "CRITICAL";
  const isWarning = alert.severity === "WARNING";
  const isInfo = alert.severity === "INFORMATION";

  const getBorderColor = () => {
    if (isCritical) return "border-rose-500/50 bg-rose-950/20";
    if (isWarning) return "border-amber-500/50 bg-amber-950/20";
    return "border-cyan-500/40 bg-cyan-950/15";
  };

  const getSeverityBadge = () => {
    if (isCritical) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
          <AlertCircle className="w-3 h-3" />
          CRITICAL
        </span>
      );
    }
    if (isWarning) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
          <AlertTriangle className="w-3 h-3" />
          WARNING
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
        <Info className="w-3 h-3" />
        INFO
      </span>
    );
  };

  const getStatusBadge = () => {
    if (alert.status === "ACTIVE") {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
          UNRESOLVED
        </span>
      );
    }
    if (alert.status === "ACKNOWLEDGED") {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          ACKNOWLEDGED
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
        RESOLVED
      </span>
    );
  };

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 hover:shadow-industrial-card ${getBorderColor()}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2.5 border-b border-industrial-800">
        <div className="flex items-center gap-2">
          {getSeverityBadge()}
          <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700">
            {alert.hoodId}
          </span>
          <span className="text-xs font-semibold text-zinc-300">{alert.category}</span>
        </div>

        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
            <Clock className="w-3 h-3" />
            {alert.timestamp}
          </span>
        </div>
      </div>

      <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
        {alert.description}
      </p>

      {/* Action Footer */}
      <div className="mt-3.5 pt-2.5 border-t border-industrial-800/80 flex items-center justify-between">
        <span className="text-[11px] text-zinc-400 font-mono">
          Station: <span className="text-zinc-200 font-medium">{alert.hoodName}</span>
        </span>

        <div className="flex items-center gap-2">
          {alert.status === "ACTIVE" && (
            <button
              onClick={() => acknowledgeAlert(alert.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium bg-industrial-800 hover:bg-industrial-700 text-zinc-200 border border-industrial-700 transition-colors"
            >
              <Check className="w-3 h-3" /> Acknowledge
            </button>
          )}

          {alert.status !== "RESOLVED" && (
            <button
              onClick={() => resolveAlert(alert.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-colors"
            >
              <CheckCircle2 className="w-3 h-3" /> Mark Resolved
            </button>
          )}

          {alert.status === "RESOLVED" && (
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Incident Closed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
