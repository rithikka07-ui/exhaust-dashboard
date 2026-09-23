import React from "react";
import {
  Activity,
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Activity className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              High-Resolution Live Sensor Monitoring
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time streaming telemetry from ESP32 nodes over MQTT with sub-second responsiveness
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2 px-2 text-xs font-mono text-slate-600 font-medium">
            <span>Tick Speed:</span>
            <select
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(Number(e.target.value))}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-bold focus:outline-none focus:border-emerald-500 shadow-2xs"
            >
              <option value={1500}>1.5s (Fast)</option>
              <option value={3000}>3.0s (Normal)</option>
              <option value={5000}>5.0s (Relaxed)</option>
            </select>
          </div>

          <button
            onClick={() => setIsLiveSimulation(!isLiveSimulation)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all shadow-2xs ${
              isLiveSimulation
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-white text-slate-600 border-slate-300 hover:text-slate-900"
            }`}
          >
            {isLiveSimulation ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-600" />
                <span>PAUSE STREAM</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                <span>RESUME STREAM</span>
              </>
            )}
          </button>

          <div className="text-[10px] font-mono text-slate-500 px-2 border-l border-slate-200 font-medium">
            Last sync: {lastTickTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Aggregate Sensor Telemetry Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Kitchen Mean Temp
            </span>
            <div className="font-mono text-2xl font-bold text-slate-900 mt-1">{avgTemp}°C</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Thermometer className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Mean Smoke Obscuration
            </span>
            <div className="font-mono text-2xl font-bold text-amber-700 mt-1">{avgSmoke}%</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <CloudFog className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Mean VOC Concentration
            </span>
            <div className="font-mono text-2xl font-bold text-sky-700 mt-1">{avgVoc} ppm</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
            <Wind className="w-5 h-5" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Instantaneous Grid Load
            </span>
            <div className="font-mono text-2xl font-bold text-emerald-700 mt-1">{totalPower} kW</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sensor Chart Engine */}
      <SensorChart defaultHood="all" compact={false} />
    </div>
  );
}
