import React from "react";
import {
  Thermometer,
  CloudFog,
  Wind,
  Cpu,
  Fan,
  ArrowRight,
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

  // Find sample hood (default H01)
  const hood = hoods.find((h) => h.id === targetHoodId) || hoods[0] || {};

  const isHigh = hood.activity === "HIGH";
  const isMed = hood.activity === "MEDIUM";

  const recommendedSpeed = isHigh ? 85 : isMed ? 60 : 20;
  const currentSpeed = hood.isOn ? hood.speed : 0;
  const savedPowerPercent = Math.max(0, 100 - currentSpeed);

  return (
    <div className="rounded-xl bg-gradient-to-r from-industrial-900 via-industrial-850 to-industrial-900 border border-emerald-500/30 p-5 shadow-subtle-glow relative overflow-hidden">
      {/* Background industrial grid overlay */}
      <div className="absolute inset-0 industrial-grid-bg opacity-30 pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Automated Causal Logic Chain
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-industrial-800 text-zinc-300 border border-industrial-700 font-semibold">
                Target: {hood.id} ({hood.name})
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Sensor Fusion → AI Activity Classification → Closed-Loop VFD Modulation
            </p>
          </div>
        </div>

        {/* Interactive Simulation Triggers for Live Testing */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerCookingSpike(hood.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-all"
            title="Simulate cooking burst: Wok ignition / high smoke"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Simulate Spike</span>
          </button>
          <button
            onClick={() => triggerCoolDown(hood.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all"
            title="Simulate kitchen idle: Rapid cooldown"
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Simulate Cooldown</span>
          </button>
        </div>
      </div>

      {/* Dynamic Status Feedback Message Banner */}
      {activityMessage && (
        <div
          className={`mb-4 px-3 py-2 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all animate-fade-in ${
            activityMessage.type === "spike"
              ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
              : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
          }`}
        >
          {activityMessage.type === "spike" ? (
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          )}
          <span className="font-semibold">{activityMessage.text}</span>
        </div>
      )}

      {/* 3-Step Visual Causal Workflow Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
        {/* Step 1: Multi-Sensor Inputs */}
        <div className="rounded-lg bg-industrial-950/80 border border-industrial-750 p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              1. IoT Multi-Sensor Influx
            </span>
            <span className="text-[10px] font-mono text-emerald-400">ESP32 Node</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs py-1 border-b border-industrial-800">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Thermometer className="w-3.5 h-3.5 text-rose-400" /> Temp
              </span>
              <span className="font-mono font-bold text-white">{hood.temperature}°C</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-industrial-800">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <CloudFog className="w-3.5 h-3.5 text-amber-400" /> Smoke
              </span>
              <span className="font-mono font-bold text-white">{hood.smoke}%</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Wind className="w-3.5 h-3.5 text-cyan-400" /> VOC
              </span>
              <span className="font-mono font-bold text-white">{hood.voc} ppm</span>
            </div>
          </div>
        </div>

        {/* Step 2: Cooking Activity Engine */}
        <div
          className={`rounded-lg p-3.5 flex flex-col justify-between border transition-all ${
            isHigh
              ? "bg-rose-950/30 border-rose-500/40 shadow-alert-glow/20"
              : isMed
              ? "bg-amber-950/30 border-amber-500/40"
              : "bg-emerald-950/30 border-emerald-500/40 shadow-subtle-glow/30"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              2. Activity Detection
            </span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </div>

          <div className="text-center py-1">
            <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1">
              Cooking Activity Level
            </div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-mono font-bold border ${
                isHigh
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse"
                  : isMed
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isHigh ? "bg-rose-400 animate-ping" : isMed ? "bg-amber-400" : "bg-emerald-400"
                }`}
              />
              {hood.activity} INTENSITY
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 text-center font-mono mt-2">
            {isHigh
              ? "Active sauteeing/frying detected"
              : isMed
              ? "Simmering/warm plate prep"
              : "Kitchen idle / minimal cooking"}
          </div>
        </div>

        {/* Step 3: Automated Exhaust Optimization */}
        <div className="rounded-lg bg-industrial-950/80 border border-industrial-750 p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              3. Exhaust Modulation
            </span>
            <Fan className={`w-4 h-4 text-emerald-400 ${hood.isOn && hood.speed > 0 ? "animate-spin" : ""}`} />
          </div>

          <div className="space-y-1.5 my-auto">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Recommended:</span>
              <span className="font-mono font-bold text-zinc-300">{recommendedSpeed}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Current Speed:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {currentSpeed}%
              </span>
            </div>

            {/* Visual animated speed bar */}
            <div className="w-full h-2 bg-industrial-800 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full transition-all duration-700 ease-out rounded-full ${
                  isHigh ? "bg-rose-500" : isMed ? "bg-amber-500" : "bg-emerald-500"
                }`}
                style={{ width: `${currentSpeed}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-2 border-t border-industrial-800 text-zinc-400">
            <span className="flex items-center gap-1 text-emerald-400 font-mono font-semibold">
              <Zap className="w-3 h-3" /> {savedPowerPercent}% Unnecessary Load Saved
            </span>
            <span className="font-mono">{hood.power} kW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
