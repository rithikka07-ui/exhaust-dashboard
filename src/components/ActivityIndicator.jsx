import React from "react";
import {
  Thermometer,
  CloudFog,
  Wind,
  Cpu,
  Fan,
  TrendingUp,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";

export default function ActivityIndicator({ targetHoodId = "H01" }) {
  const {
    hoods,
    triggerCookingSpike,
    triggerCoolDown,
    activityMessage,
  } = useHoods();

  const hood = hoods.find((h) => h.id === targetHoodId) || hoods[0] || {};

  const isHigh = hood.activity === "HIGH";
  const isMed = hood.activity === "MEDIUM";

  const recommendedSpeed = isHigh ? 85 : isMed ? 60 : 20;
  const currentSpeed = hood.isOn ? hood.speed : 0;
  const savedPowerPercent = Math.max(0, 100 - currentSpeed);

  return (
    <div className="rounded-xl bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/70 border border-emerald-200 p-5 shadow-xs relative overflow-hidden transition-colors duration-200">
      {/* Background grid overlay */}
      <div className="absolute inset-0 industrial-grid-bg opacity-40 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Automated Causal Logic Chain
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-300 font-semibold shadow-2xs">
                Target: {hood.id} ({hood.name})
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Sensor Fusion → AI Activity Classification → Closed-Loop VFD Modulation
            </p>
          </div>
        </div>

        {/* Interactive Simulation Triggers for Live Testing */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerCookingSpike(hood.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 transition-all shadow-2xs"
            title="Simulate cooking burst: Wok ignition / high smoke"
          >
            <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
            <span>Simulate Spike</span>
          </button>
          <button
            onClick={() => triggerCoolDown(hood.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 transition-all shadow-2xs"
            title="Simulate kitchen idle: Rapid cooldown"
          >
            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulate Cooldown</span>
          </button>
        </div>
      </div>

      {/* Dynamic Status Feedback Message Banner */}
      {activityMessage && (
        <div
          className={`mb-4 px-3 py-2 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all animate-fade-in ${
            activityMessage.type === "spike"
              ? "bg-rose-50 border-rose-300 text-rose-800"
              : "bg-emerald-50 border-emerald-300 text-emerald-800"
          }`}
        >
          {activityMessage.type === "spike" ? (
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          )}
          <span className="font-semibold">{activityMessage.text}</span>
        </div>
      )}

      {/* 3-Step Visual Causal Workflow Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
        {/* Step 1: Multi-Sensor Inputs */}
        <div className="rounded-lg bg-white border border-slate-200 p-3.5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              1. IoT Multi-Sensor Influx
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold">ESP32 Node</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Thermometer className="w-3.5 h-3.5 text-rose-500" /> Temp
              </span>
              <span className="font-mono font-bold text-slate-900">{hood.temperature}°C</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
              <span className="flex items-center gap-1.5 text-slate-600">
                <CloudFog className="w-3.5 h-3.5 text-amber-500" /> Smoke
              </span>
              <span className="font-mono font-bold text-slate-900">{hood.smoke}%</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Wind className="w-3.5 h-3.5 text-sky-500" /> VOC
              </span>
              <span className="font-mono font-bold text-slate-900">{hood.voc} ppm</span>
            </div>
          </div>
        </div>

        {/* Step 2: Cooking Activity Engine */}
        <div
          className={`rounded-lg p-3.5 flex flex-col justify-between border transition-all shadow-2xs ${
            isHigh
              ? "bg-rose-50/80 border-rose-300"
              : isMed
              ? "bg-amber-50/80 border-amber-300"
              : "bg-emerald-50/80 border-emerald-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              2. Activity Detection
            </span>
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          </div>

          <div className="text-center py-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-1 font-semibold">
              Cooking Activity Level
            </div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-mono font-bold border ${
                isHigh
                  ? "bg-white text-rose-700 border-rose-300 shadow-2xs"
                  : isMed
                  ? "bg-white text-amber-700 border-amber-300 shadow-2xs"
                  : "bg-white text-emerald-700 border-emerald-300 shadow-2xs"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isHigh ? "bg-rose-600 animate-ping" : isMed ? "bg-amber-600" : "bg-emerald-600"
                }`}
              />
              {hood.activity} INTENSITY
            </div>
          </div>

          <div className="text-[11px] text-slate-600 text-center font-mono mt-2 font-medium">
            {isHigh
              ? "Active sauteeing/frying detected"
              : isMed
              ? "Simmering/warm plate prep"
              : "Kitchen idle / minimal cooking"}
          </div>
        </div>

        {/* Step 3: Automated Exhaust Optimization */}
        <div className="rounded-lg bg-white border border-slate-200 p-3.5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              3. Exhaust Modulation
            </span>
            <Fan className={`w-4 h-4 text-emerald-600 ${hood.isOn && hood.speed > 0 ? "animate-spin" : ""}`} />
          </div>

          <div className="space-y-1.5 my-auto">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Recommended:</span>
              <span className="font-mono font-bold text-slate-800">{recommendedSpeed}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Current Speed:</span>
              <span className="font-mono font-bold text-emerald-700 text-sm">
                {currentSpeed}%
              </span>
            </div>

            {/* Visual animated speed bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full transition-all duration-700 ease-out rounded-full ${
                  isHigh ? "bg-rose-500" : isMed ? "bg-amber-500" : "bg-emerald-500"
                }`}
                style={{ width: `${currentSpeed}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-mono font-semibold">
              <Zap className="w-3 h-3 text-emerald-600" /> {savedPowerPercent}% Unnecessary Load Saved
            </span>
            <span className="font-mono text-slate-700 font-bold">{hood.power} kW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
