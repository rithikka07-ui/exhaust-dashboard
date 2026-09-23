import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Fan,
  Activity,
  Zap,
  Leaf,
  BellRing,
  ArrowRight,
  Sliders,
  Sparkles,
  Power,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";
import StatCard from "../components/StatCard";
import HoodCard from "../components/HoodCard";
import ActivityIndicator from "../components/ActivityIndicator";
import SensorChart from "../components/SensorChart";
import SystemHealth from "../components/SystemHealth";

export default function Dashboard() {
  const {
    hoods,
    energy,
    totalHoods,
    activeHoods,
    activeAlertsCount,
    currentTotalPower,
    batchSetMode,
    batchSetPower,
    toggleHoodPower,
    toggleHoodMode,
    setHoodSpeed,
  } = useHoods();

  // Focal master hood control (defaults to H01)
  const [focalHoodId, setFocalHoodId] = useState("H01");
  const focalHood = hoods.find((h) => h.id === focalHoodId) || hoods[0];

  // First 6 hoods for dashboard status grid
  const dashboardHoods = hoods.slice(0, 6);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 5 Summary KPI Cards in a responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          title="Total Kitchen Hoods"
          value={totalHoods}
          unit="Units"
          icon={Fan}
          trend="100% Configured"
          trendDirection="neutral"
          trendColor="blue"
          subtext="12 Kitchen Zones"
        />

        <StatCard
          title="Active Hoods"
          value={activeHoods}
          unit={`/ ${totalHoods}`}
          icon={Activity}
          trend={`${Math.round((activeHoods / totalHoods) * 100)}% Operational`}
          trendDirection="up"
          trendColor="green"
          subtext="Currently Running"
        />

        <StatCard
          title="Energy Consumption"
          value={energy.todayConsumption}
          unit="kWh"
          icon={Zap}
          trend="-18.2% vs Baseline"
          trendDirection="down"
          trendColor="green"
          subtext="Today's Shift"
        />

        <StatCard
          title="Energy Saved"
          value={energy.energySaved}
          unit="kWh"
          icon={Leaf}
          trend="+24.5% Efficiency"
          trendDirection="up"
          trendColor="green"
          subtext="Smart VFD Modulation"
        />

        <StatCard
          title="Active Alerts"
          value={activeAlertsCount}
          unit="Items"
          icon={BellRing}
          trend={activeAlertsCount > 0 ? "Requires Review" : "Nominal"}
          trendDirection={activeAlertsCount > 0 ? "up" : "neutral"}
          trendColor={activeAlertsCount > 0 ? "red" : "green"}
          subtext="Critical / Warning"
        />
      </div>

      {/* Visually Prominent Cooking Activity Detection Causal Chain */}
      <ActivityIndicator targetHoodId="H01" />

      {/* Dashboard Main 2-Column Section: Hoods Grid + Control Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Kitchen Hood Status Grid (Hoods 01-06) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Kitchen Hood Status Grid
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Primary Line (01–06)
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-time sensory feedback, automated VFD modulation & individual overrides
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/hoods"
                className="flex items-center gap-1 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>View All 12 Hoods</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {dashboardHoods.map((hood) => (
              <HoodCard key={hood.id} hood={hood} />
            ))}
          </div>
        </div>

        {/* Right 1 Col: Focal Exhaust Control Panel & System Health */}
        <div className="space-y-6">
          {/* Exhaust Control Panel */}
          <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Exhaust Control Panel
                  </h3>
                  <span className="text-[10px] text-zinc-400 font-mono">Focal Station Override</span>
                </div>
              </div>

              {/* Station selector */}
              <select
                value={focalHoodId}
                onChange={(e) => setFocalHoodId(e.target.value)}
                className="bg-industrial-800 border border-industrial-700 text-xs font-mono text-zinc-200 rounded px-2 py-1 focus:outline-none focus:border-emerald-500"
              >
                {hoods.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.id} ({h.name.split(" ")[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Focal Hood Detailed Control Box */}
            <div className="mt-4 space-y-3.5">
              <div className="p-3 rounded-lg bg-industrial-950/70 border border-industrial-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Station Identity:</span>
                  <span className="font-bold text-white font-mono">{focalHood.id} — {focalHood.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Operating Mode:</span>
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                      focalHood.mode === "AUTO"
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {focalHood.mode}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Current Load / Power:</span>
                  <span className="font-mono font-bold text-emerald-400">{focalHood.power} kW</span>
                </div>
              </div>

              {/* Operating Mode (AUTO/MANUAL toggle) */}
              <div>
                <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 block mb-1.5">
                  Operating Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (focalHood.mode !== "AUTO") toggleHoodMode(focalHood.id);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      focalHood.mode === "AUTO"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-subtle-glow"
                        : "bg-industrial-800 text-zinc-400 border-industrial-700 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AUTO MODE
                  </button>

                  <button
                    onClick={() => {
                      if (focalHood.mode !== "MANUAL") toggleHoodMode(focalHood.id);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      focalHood.mode === "MANUAL"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                        : "bg-industrial-800 text-zinc-400 border-industrial-700 hover:text-white"
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    MANUAL OVERRIDE
                  </button>
                </div>
              </div>

              {/* Exhaust Status (ON/OFF) */}
              <div>
                <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 block mb-1.5">
                  Exhaust Relay Status
                </label>
                <button
                  onClick={() => toggleHoodPower(focalHood.id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-mono font-bold border flex items-center justify-center gap-2 transition-all ${
                    focalHood.isOn
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-300"
                      : "bg-industrial-800 text-zinc-400 border-zinc-700 hover:bg-emerald-500/20 hover:text-emerald-300"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {focalHood.isOn ? "EXHAUST FAN ONLINE (CLICK TO POWER OFF)" : "EXHAUST FAN SHUTDOWN (CLICK TO POWER ON)"}
                </button>
              </div>

              {/* Exhaust Speed Slider (0-100%) */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                    Fan Speed Modulation
                  </label>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {focalHood.isOn ? `${focalHood.speed}%` : "0%"}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={focalHood.isOn ? focalHood.speed : 0}
                  disabled={focalHood.mode === "AUTO" || !focalHood.isOn}
                  onChange={(e) => setHoodSpeed(focalHood.id, e.target.value)}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-all ${
                    focalHood.mode === "AUTO" || !focalHood.isOn
                      ? "bg-industrial-800 accent-emerald-500 cursor-not-allowed opacity-75"
                      : "bg-industrial-700 accent-emerald-400 hover:accent-emerald-300"
                  }`}
                />

                {focalHood.mode === "AUTO" && (
                  <p className="text-[11px] text-zinc-400 mt-1.5 font-mono italic">
                    * In AUTO mode, fan speed is continuously governed by sensory activity fusion.
                  </p>
                )}
              </div>

              {/* Batch Quick Operations */}
              <div className="pt-3 border-t border-industrial-800 flex items-center gap-2">
                <button
                  onClick={() => batchSetMode("AUTO")}
                  className="flex-1 py-1.5 px-2 rounded bg-industrial-800 hover:bg-industrial-750 text-[11px] font-mono text-zinc-300 border border-industrial-700 text-center"
                >
                  Set All 12 to Auto
                </button>
                <button
                  onClick={() => batchSetPower(true)}
                  className="flex-1 py-1.5 px-2 rounded bg-industrial-800 hover:bg-industrial-750 text-[11px] font-mono text-emerald-400 border border-industrial-700 text-center"
                >
                  Power All On
                </button>
              </div>
            </div>
          </div>

          {/* System Telemetry Architecture Health Component */}
          <SystemHealth orientation="vertical" />
        </div>
      </div>

      {/* Live Sensor Monitoring Section */}
      <div className="space-y-3 pt-4 border-t border-industrial-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Live Sensor Telemetry Streams
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold animate-pulse">
                SIMULATED IoT FEED
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Continuous time-series tracking of Temperature, Smoke, VOC, and Real-Time Power
            </p>
          </div>

          <Link
            to="/monitoring"
            className="flex items-center gap-1 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Open Dedicated Monitoring View</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <SensorChart defaultHood="all" compact={true} />
      </div>
    </div>
  );
}
