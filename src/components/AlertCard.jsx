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

  const getBorderColor = () => {
    if (isCritical) return "border-rose-300 bg-rose-50/60";
    if (isWarning) return "border-amber-300 bg-amber-50/60";
    return "border-sky-300 bg-sky-50/60";
  };

  const getSeverityBadge = () => {
    if (isCritical) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-rose-700 border border-rose-300 shadow-2xs animate-pulse">
          <AlertCircle className="w-3 h-3 text-rose-600" />
          CRITICAL
        </span>
      );
    }
    if (isWarning) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-amber-700 border border-amber-300 shadow-2xs">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          WARNING
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-sky-700 border border-sky-300 shadow-2xs">
        <Info className="w-3 h-3 text-sky-600" />
        INFO
      </span>
    );
  };

  const getStatusBadge = () => {
    if (alert.status === "ACTIVE") {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300">
          UNRESOLVED
        </span>
      );
    }
    if (alert.status === "ACKNOWLEDGED") {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
          ACKNOWLEDGED
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
        RESOLVED
      </span>
    );
  };

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 shadow-xs hover:shadow-md ${getBorderColor()}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2.5 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          {getSeverityBadge()}
          <span className="font-mono text-xs font-bold text-slate-800 px-2 py-0.5 rounded bg-white border border-slate-200 shadow-2xs">
            {alert.hoodId}
          </span>
          <span className="text-xs font-bold text-slate-900">{alert.category}</span>
        </div>

        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
            <Clock className="w-3 h-3" />
            {alert.timestamp}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-700 mt-3 leading-relaxed font-medium">
        {alert.description}
      </p>

      {/* Action Footer */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-mono">
          Station: <span className="text-slate-900 font-semibold">{alert.hoodName}</span>
        </span>

        <div className="flex items-center gap-2">
          {alert.status === "ACTIVE" && (
            <button
              onClick={() => acknowledgeAlert(alert.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shadow-2xs"
            >
              <Check className="w-3 h-3" /> Acknowledge
            </button>
          )}

          {alert.status !== "RESOLVED" && (
            <button
              onClick={() => resolveAlert(alert.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-2xs"
            >
              <CheckCircle2 className="w-3 h-3" /> Mark Resolved
            </button>
          )}

          {alert.status === "RESOLVED" && (
            <span className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Incident Closed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
