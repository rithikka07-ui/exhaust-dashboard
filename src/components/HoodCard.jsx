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
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
          HIGH ACT
        </span>
      );
    }
    if (hood.activity === "MEDIUM") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
          MED ACT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
        LOW ACT
      </span>
    );
  };

  const getStatusBadge = () => {
    if (!hood.isOn) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-500 border border-slate-200">
          OFF
        </span>
      );
    }
    if (hood.status === "ACTIVE") {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          ACTIVE
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
        IDLE
      </span>
    );
  };

  return (
    <div
      className={`rounded-xl bg-white border transition-all duration-200 p-4 flex flex-col justify-between shadow-xs hover:shadow-md ${
        hood.isOn
          ? isHighActivity
            ? "border-rose-300 ring-1 ring-rose-200"
            : "border-slate-200 hover:border-slate-300"
          : "border-slate-200 opacity-80"
      }`}
    >
      {/* Header: Hood ID, Zone, Status & Activity */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-slate-900 tracking-tight">
                {hood.id}
              </span>
              <span className="text-xs text-slate-700 font-semibold truncate max-w-[140px]" title={hood.name}>
                {hood.name}
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
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
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Thermometer
                className={`w-3.5 h-3.5 ${
                  hood.temperature >= 75
                    ? "text-rose-600"
                    : hood.temperature >= 55
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              />
              <span className="text-[10px] uppercase font-semibold">Temp</span>
            </div>
            <span
              className={`font-mono text-sm font-bold font-tabular ${
                hood.temperature >= 75
                  ? "text-rose-600"
                  : hood.temperature >= 55
                  ? "text-amber-600"
                  : "text-slate-800"
              }`}
            >
              {hood.temperature}°C
            </span>
          </div>

          {/* Smoke */}
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <CloudFog
                className={`w-3.5 h-3.5 ${
                  hood.smoke >= 45
                    ? "text-rose-600"
                    : hood.smoke >= 25
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              />
              <span className="text-[10px] uppercase font-semibold">Smoke</span>
            </div>
            <span
              className={`font-mono text-sm font-bold font-tabular ${
                hood.smoke >= 45
                  ? "text-rose-600"
                  : hood.smoke >= 25
                  ? "text-amber-600"
                  : "text-slate-800"
              }`}
            >
              {hood.smoke}%
            </span>
          </div>

          {/* VOC */}
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Wind
                className={`w-3.5 h-3.5 ${
                  hood.voc >= 200
                    ? "text-rose-600"
                    : hood.voc >= 130
                    ? "text-amber-600"
                    : "text-sky-600"
                }`}
              />
              <span className="text-[10px] uppercase font-semibold">VOC</span>
            </div>
            <span
              className={`font-mono text-sm font-bold font-tabular ${
                hood.voc >= 200
                  ? "text-rose-600"
                  : hood.voc >= 130
                  ? "text-amber-600"
                  : "text-slate-800"
              }`}
            >
              {hood.voc} <span className="text-[10px] font-normal text-slate-400">ppm</span>
            </span>
          </div>

          {/* Power */}
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] uppercase font-semibold">Power</span>
            </div>
            <span className="font-mono text-sm font-bold text-emerald-700 font-tabular">
              {hood.power} <span className="text-[10px] font-normal text-slate-400">kW</span>
            </span>
          </div>
        </div>

        {/* Energy Today Row */}
        <div className="flex items-center justify-between px-2.5 py-1.5 mb-3 rounded bg-slate-50 border border-slate-200 text-xs">
          <span className="text-slate-500 text-[11px] font-medium">Energy Today</span>
          <span className="font-mono font-bold text-slate-800">{hood.energy} kWh</span>
        </div>

        {/* Exhaust Fan Speed Progress / Slider */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-slate-500">
              <Gauge className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-semibold uppercase">Exhaust Speed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-emerald-700 text-xs">
                {hood.isOn ? `${hood.speed}%` : "0%"}
              </span>
              {hood.mode === "AUTO" && (
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold">
                  AUTO-DRIVEN
                </span>
              )}
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={hood.isOn ? hood.speed : 0}
              disabled={hood.mode === "AUTO" || !hood.isOn}
              onChange={(e) => setHoodSpeed(hood.id, e.target.value)}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-all ${
                hood.mode === "AUTO" || !hood.isOn
                  ? "bg-slate-200 accent-emerald-600 cursor-not-allowed opacity-80"
                  : "bg-slate-200 accent-emerald-600 hover:accent-emerald-500"
              }`}
            />
            {hood.mode === "AUTO" && (
              <div
                className="absolute top-0 bottom-0 left-0 bg-emerald-500 rounded-lg pointer-events-none transition-all duration-300"
                style={{ width: `${hood.isOn ? hood.speed : 0}%`, height: "8px" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer Controls: AUTO/MANUAL toggle & ON/OFF switch */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* AUTO / MANUAL Toggle Button */}
        <button
          onClick={() => toggleHoodMode(hood.id)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-mono font-bold border transition-all ${
            hood.mode === "AUTO"
              ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
              : "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
          }`}
          title="Toggle between Automated Activity Control and Manual Speed Override"
        >
          {hood.mode === "AUTO" ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>MODE: AUTO</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>MODE: MANUAL</span>
            </>
          )}
        </button>

        {/* ON / OFF Switch Button */}
        <button
          onClick={() => toggleHoodPower(hood.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
            hood.isOn
              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300"
              : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
          }`}
          title={hood.isOn ? "Turn Hood Exhaust OFF" : "Turn Hood Exhaust ON"}
        >
          <Power className={`w-3.5 h-3.5 ${hood.isOn ? "text-emerald-600" : "text-slate-400"}`} />
          <span>{hood.isOn ? "ON" : "OFF"}</span>
        </button>
      </div>
    </div>
  );
}
