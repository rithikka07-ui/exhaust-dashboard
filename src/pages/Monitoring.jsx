import React, { useState } from "react";
import {
  Activity,
  Radio,
  Clock,
  Gauge,
  Sliders,
  Play,
  Pause,
  Thermometer,
  CloudFog,
  Wind,
  Zap,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";
import SensorChart from "../components/SensorChart";

export default function Monitoring() {
  const {
    isLiveSimulation,
    setIsLiveSimulation,
    simulationSpeed,
    setSimulationSpeed,
    lastTickTime,
    hoods,
  } = useHoods();

  const [selectedStation, setSelectedStation] = useState("all");

  // Calculate kitchen-wide averages
  const activeHoodsList = hoods.filter((h) => h.isOn);
  const avgTemp = Math.round(
    activeHoodsList.reduce((acc, h) => acc + h.temperature, 0) / (activeHoodsList.length || 1)
  );
  const avgSmoke = Math.round(
    activeHoodsList.reduce((acc, h) => acc + h.smoke, 0) / (activeHoodsList.length || 1)
  );
  const avgVoc = Math.round(
    activeHoodsList.reduce((acc, h) => acc + h.voc, 0) / (activeHoodsList.length || 1)
  );
  const totalPower = +(
    activeHoodsList.reduce((acc, h) => acc + h.power, 0)
  ).toFixed(2);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header with Live IoT Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-industrial-900 border border-industrial-750">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              High-Resolution Live Sensor Monitoring
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time streaming telemetry from ESP32 nodes over MQTT with sub-second responsiveness
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-industrial-950/80 p-2 rounded-lg border border-industrial-750">
          <div className="flex items-center gap-2 px-2 text-xs font-mono text-zinc-400">
            <span>Tick Speed:</span>
            <select
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(Number(e.target.value))}
              className="bg-industrial-800 border border-industrial-700 rounded px-2 py-1 text-xs text-zinc-200 font-bold focus:outline-none focus:border-emerald-500"
            >
              <option value={1500}>1.5s (Fast)</option>
              <option value={3000}>3.0s (Normal)</option>
              <option value={5000}>5.0s (Relaxed)</option>
            </select>
          </div>

          <button
            onClick={() => setIsLiveSimulation(!isLiveSimulation)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all ${
              isLiveSimulation
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-industrial-800 text-zinc-400 border-industrial-600"
            }`}
          >
            {isLiveSimulation ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-400" />
                <span>PAUSE STREAM</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>RESUME STREAM</span>
              </>
            )}
          </button>

          <div className="text-[10px] font-mono text-zinc-400 px-2 border-l border-industrial-800">
            Last sync: {lastTickTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Aggregate Sensor Telemetry Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-industrial-900 border border-industrial-750 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Kitchen Mean Temp
            </span>
            <div className="font-mono text-2xl font-bold text-white mt-1">{avgTemp}°C</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Thermometer className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-industrial-900 border border-industrial-750 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Mean Smoke Obscuration
            </span>
            <div className="font-mono text-2xl font-bold text-amber-400 mt-1">{avgSmoke}%</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <CloudFog className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-industrial-900 border border-industrial-750 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Mean VOC Concentration
            </span>
            <div className="font-mono text-2xl font-bold text-cyan-400 mt-1">{avgVoc} ppm</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Wind className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-industrial-900 border border-industrial-750 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Instantaneous Grid Load
            </span>
            <div className="font-mono text-2xl font-bold text-emerald-400 mt-1">{totalPower} kW</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sensor Chart Engine */}
      <SensorChart defaultHood="all" compact={false} />
    </div>
  );
}
