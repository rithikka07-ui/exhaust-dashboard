import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function StatCard({
  title,
  value,
  unit = "",
  icon: Icon,
  trend,
  trendDirection = "neutral",
  trendColor = "green",
  subtext,
  onClick,
}) {
  const getTrendColorClass = () => {
    switch (trendColor) {
      case "green":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "yellow":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "red":
        return "text-rose-700 bg-rose-50 border-rose-200";
      case "blue":
      default:
        return "text-sky-700 bg-sky-50 border-sky-200";
    }
  };

  const getIconColorClass = () => {
    switch (trendColor) {
      case "green":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "yellow":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "red":
        return "text-rose-600 bg-rose-50 border-rose-200";
      case "blue":
      default:
        return "text-sky-600 bg-sky-50 border-sky-200";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl bg-white border border-slate-200 p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-md ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Subtle top indicator bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 ${
          trendColor === "green"
            ? "bg-emerald-500"
            : trendColor === "yellow"
            ? "bg-amber-500"
            : trendColor === "red"
            ? "bg-rose-500"
            : "bg-sky-500"
        }`}
      />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-tabular">
              {value}
            </span>
            {unit && (
              <span className="text-xs font-mono font-medium text-slate-500">
                {unit}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={`w-10 h-10 rounded-lg border flex items-center justify-center ${getIconColorClass()}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-mono font-bold ${getTrendColorClass()}`}
          >
            {trendDirection === "up" && <ArrowUpRight className="w-3.5 h-3.5" />}
            {trendDirection === "down" && <ArrowDownRight className="w-3.5 h-3.5" />}
            {trendDirection === "neutral" && <Minus className="w-3.5 h-3.5" />}
            <span>{trend}</span>
          </div>
        )}

        {subtext && (
          <span className="text-[11px] text-slate-400 truncate ml-auto font-medium">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}
