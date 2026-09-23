import React from "react";
import { Fan, Power, Sparkles, RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import { useHoods } from "../context/HoodContext";

export default function HoodCard({ hood }) {
  const { toggleHoodPower, toggleHoodMode } = useHoods();

  if (!hood) return null;

  const isWarning = hood.temperature > 40 || hood.smoke > 300 || hood.voc > 250;

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 shadow-2xs ${
        hood.isOn
          ? "bg-white border-slate-200 hover:border-slate-300"
          : "bg-slate-50/70 border-slate-200 opacity-80"
      }`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border ${
              hood.isOn
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {hood.id}
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
              {hood.name}
            </h3>
            <span className="text-[10px] font-mono text-slate-500 block">
              Zone: {hood.zone || "Kitchen Line"}
            </span>
          </div>
        </div>

        <button
          onClick={() => toggleHoodMode(hood.id)}
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border flex items-center gap-1 ${
            hood.mode === "AUTO"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}
        >
          {hood.mode === "AUTO" ? (
            <Sparkles className="w-3 h-3 text-emerald-600" />
          ) : (
            <RotateCcw className="w-3 h-3 text-amber-600" />
          )}
          {hood.mode}
        </button>
      </div>

      {/* Sensor Values */}
      <div className="grid grid-cols-3 gap-2 py-3 text-center border-b border-slate-100">
        <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
          <span className="text-[9px] uppercase font-mono text-slate-400 block font-semibold">
            Temp
          </span>
          <span className="text-xs font-mono font-bold text-slate-800">
            {hood.temperature}°C
          </span>
        </div>

        <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
          <span className="text-[9px] uppercase font-mono text-slate-400 block font-semibold">
            Smoke
          </span>
          <span className="text-xs font-mono font-bold text-slate-800">
            {hood.smoke} PPM
          </span>
        </div>

        <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
          <span className="text-[9px] uppercase font-mono text-slate-400 block font-semibold">
            Power
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700">
            {hood.power} kW
          </span>
        </div>
      </div>

      {/* Controls & Status Footer */}
      <div className="pt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Fan
            className={`w-4 h-4 ${
              hood.isOn ? "text-emerald-500 animate-spin" : "text-slate-300"
            }`}
          />
          <span className="text-xs font-mono font-bold text-slate-700">
            {hood.isOn ? `${hood.speed}% Speed` : "OFF"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isWarning ? (
            <span className="flex items-center gap-1 text-[10px] font-mono text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <AlertTriangle className="w-3 h-3" /> Warning
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <ShieldCheck className="w-3 h-3" /> Nominal
            </span>
          )}

          <button
            onClick={() => toggleHoodPower(hood.id)}
            className={`p-1.5 rounded border transition-colors ${
              hood.isOn
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                : "bg-slate-100 text-slate-400 border-slate-200 hover:text-emerald-600"
            }`}
            title="Toggle Power"
          >
            <Power className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}