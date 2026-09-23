import React from "react";
import {
  Thermometer,
  CloudFog,
  Wind,
  Zap,
  Power,
  RotateCcw,
  Sparkles,
  Gauge,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";

export default function HoodCard({ hood }) {
  const { toggleHoodPower, toggleHoodMode, setHoodSpeed } = useHoods();

  const isHighActivity = hood.activity === "HIGH";
  const isMediumActivity = hood.activity === "MEDIUM";

  // Semantic badges
  const getActivityBadge = () => {
    if (hood.activity === "HIGH") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          HIGH ACT
        </span>
      );
    }
    if (hood.activity === "MEDIUM") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          MED ACT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        LOW ACT
      </span>
    );
  };

  const getStatusBadge = () => {
    if (!hood.isOn) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
          OFF
        </span>
      );
    }
    if (hood.status === "ACTIVE") {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
          ACTIVE
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
        IDLE
      </span>
    );
  };

  return (
    <div
      className={`rounded-xl bg-industrial-900 border transition-all duration-200 p-4 flex flex-col justify-between ${
        hood.isOn
          ? isHighActivity
            ? "border-rose-500/40 shadow-alert-glow/20"
            : "border-industrial-700/80 hover:border-industrial-600"
          : "border-industrial-800/60 opacity-75"
      }`}
    >
      {/* Header: Hood ID, Zone, Status & Activity */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-white tracking-tight">
                {hood.id}
              </span>
              <span className="text-xs text-zinc-300 font-medium truncate max-w-[140px]" title={hood.name}>
                {hood.name}
              </span>
            </div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
              {hood.zone}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {getStatusBadge()}
            {getActivityBadge()}
          </div>
        </div>

        {/* 4 Sensor Gauges */}
        <div className="grid grid-cols-2 gap-2 my-3.5">
          {/* Temperature */}
          <div className="p-2 rounded-lg bg-industrial-850 border border-industrial-750 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Thermometer
                className={`w-3.5 h-3.5 ${
                  hood.temperature >= 75
                    ? "text-rose-400"
                    : hood.temperature >= 55
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              />
              <span className="text-[10px] uppercase font-semibold">Temp</span>
            </div>
            <span
              className={`font-mono text-sm font-bold font-tabular ${
                hood.temperature >= 75
                  ? "text-rose-400"
                  : hood.temperature >= 55
                  ? "text-amber-400"
                  : "text-zinc-100"
              }`}
            >
              {hood.temperature}°C
            </span>
          </div>

          {/* Smoke */}
          <div className="p-2 rounded-lg bg-industrial-850 border border-industrial-750 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <CloudFog
                className={`w-3.5 h-3.5 ${
                  hood.smoke >= 45
                    ? "text-rose-400"
                    : hood.smoke >= 25
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              />
              <span className="text-[10px] uppercase font-semibold">Smoke</span>
            </div>
            <span
              className={`font-mono text-sm font-bold font-tabular ${
                hood.smoke >= 45
                  ? "text-rose-400"
                  : hood.smoke >= 25
                  ? "text-amber-400"
                  : "text-zinc-100"
              }`}
            >
              {hood.smoke}%
            </span>
          </div>

          {/* VOC */}
          <div className="p-2 rounded-lg bg-industrial-850 border border-industrial-750 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Wind
                className={`w-3.5 h-3.5 ${
                  hood.voc >= 200
                    ? "text-rose-400"
                    : hood.voc >= 130
                    ? "text-amber-400"
                    : "text-cyan-400"
                }`}
              />
              <span className="text-[10px] uppercase font-semibold">VOC</span>
            </div>
            <span
              className={`font-mono text-sm font-bold font-tabular ${
                hood.voc >= 200
                  ? "text-rose-400"
                  : hood.voc >= 130
                  ? "text-amber-400"
                  : "text-zinc-100"
              }`}
            >
              {hood.voc} <span className="text-[10px] font-normal text-zinc-400">ppm</span>
            </span>
          </div>

          {/* Power */}
          <div className="p-2 rounded-lg bg-industrial-850 border border-industrial-750 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] uppercase font-semibold">Power</span>
            </div>
            <span className="font-mono text-sm font-bold text-emerald-400 font-tabular">
              {hood.power} <span className="text-[10px] font-normal text-zinc-400">kW</span>
            </span>
          </div>
        </div>

        {/* Energy Today Row */}
        <div className="flex items-center justify-between px-2 py-1.5 mb-3 rounded bg-industrial-950/60 border border-industrial-800 text-xs">
          <span className="text-zinc-400 text-[11px]">Energy Today</span>
          <span className="font-mono font-bold text-zinc-200">{hood.energy} kWh</span>
        </div>

        {/* Exhaust Fan Speed Progress / Slider */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-zinc-400">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-semibold uppercase">Exhaust Speed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-emerald-400 text-xs">
                {hood.isOn ? `${hood.speed}%` : "0%"}
              </span>
              {hood.mode === "AUTO" && (
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  AUTO-DRIVEN
                </span>
              )}
            </div>
          </div>

          {/* Interactive Range Slider (disabled in AUTO mode or when OFF) */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={hood.isOn ? hood.speed : 0}
              disabled={hood.mode === "AUTO" || !hood.isOn}
              onChange={(e) => setHoodSpeed(hood.id, e.target.value)}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer transition-all ${
                hood.mode === "AUTO" || !hood.isOn
                  ? "bg-industrial-800 accent-emerald-500 cursor-not-allowed opacity-80"
                  : "bg-industrial-700 accent-emerald-400 hover:accent-emerald-300"
              }`}
            />
            {hood.mode === "AUTO" && (
              <div
                className="absolute top-0 bottom-0 left-0 bg-emerald-500 rounded-lg pointer-events-none transition-all duration-300"
                style={{ width: `${hood.isOn ? hood.speed : 0}%`, height: "6px" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer Controls: AUTO/MANUAL toggle & ON/OFF switch */}
      <div className="pt-3 border-t border-industrial-800 flex items-center justify-between gap-2">
        {/* AUTO / MANUAL Toggle Button */}
        <button
          onClick={() => toggleHoodMode(hood.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-mono font-bold border transition-all ${
            hood.mode === "AUTO"
              ? "bg-emerald-950/50 text-emerald-400 border-emerald-500/40 hover:bg-emerald-900/50"
              : "bg-industrial-800 text-amber-300 border-amber-500/40 hover:bg-industrial-750"
          }`}
          title="Toggle between Automated Activity Control and Manual Speed Override"
        >
          {hood.mode === "AUTO" ? (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>MODE: AUTO</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>MODE: MANUAL</span>
            </>
          )}
        </button>

        {/* ON / OFF Switch Button */}
        <button
          onClick={() => toggleHoodPower(hood.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
            hood.isOn
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40"
              : "bg-industrial-800 text-zinc-400 border-zinc-700 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40"
          }`}
          title={hood.isOn ? "Turn Hood Exhaust OFF" : "Turn Hood Exhaust ON"}
        >
          <Power className={`w-3.5 h-3.5 ${hood.isOn ? "text-emerald-400" : "text-zinc-500"}`} />
          <span>{hood.isOn ? "ON" : "OFF"}</span>
        </button>
      </div>
    </div>
  );
}
