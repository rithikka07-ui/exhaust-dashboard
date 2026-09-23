import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function StatCard({
  title,
  value,
  unit = "",
  icon: Icon,
  trend,
  trendDirection = "neutral", // "up" | "down" | "neutral"
  trendColor = "green", // "green" | "yellow" | "red" | "blue"
  subtext,
  onClick,
}) {
  const getTrendColorClass = () => {
    switch (trendColor) {
      case "green":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "yellow":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "red":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "blue":
      default:
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    }
  };

  const getIconColorClass = () => {
    switch (trendColor) {
      case "green":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "yellow":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "red":
        return "text-rose-400 bg-rose-500/10 border-rose-500/30";
      case "blue":
      default:
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl bg-industrial-900 border border-industrial-700/80 p-4 transition-all duration-200 hover:border-industrial-600 hover:shadow-industrial-card ${
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
            : "bg-cyan-500"
        }`}
      />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            {title}
          </span>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white font-tabular">
              {value}
            </span>
            {unit && (
              <span className="text-xs font-mono font-medium text-zinc-400">
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

      <div className="mt-3 pt-2.5 border-t border-industrial-800/80 flex items-center justify-between text-xs">
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
          <span className="text-[11px] text-zinc-400 truncate ml-auto font-medium">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}
