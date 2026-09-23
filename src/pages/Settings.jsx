import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Sliders,
  BellRing,
  Cpu,
  Save,
  CheckCircle2,
  Database,
  Radio,
  Server,
  KeyRound,
  Thermometer,
  CloudFog,
  Wind,
  Zap,
} from "lucide-react";
import SystemHealth from "../components/SystemHealth";

export default function Settings() {
  const [tempUnit, setTempUnit] = useState("C");
  const [refreshInterval, setRefreshInterval] = useState("3");
  const [tempThreshold, setTempThreshold] = useState("75");
  const [smokeThreshold, setSmokeThreshold] = useState("45");
  const [vocThreshold, setVocThreshold] = useState("200");
  const [powerSurgeThreshold, setPowerSurgeThreshold] = useState("3.0");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-industrial-900 border border-industrial-750">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              System Configuration & Edge Thresholds
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Tune sensor trigger sensitivities, safety interlocks, and review network connection parameters
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Persisted to Edge Cache</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSavePreferences} className="space-y-6">
        {/* Section 1: System Preferences & Units */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-5">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-industrial-800">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Telemetry & Display Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Temperature Unit
              </label>
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full bg-industrial-800 border border-industrial-700 rounded-lg p-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="C">Celsius (°C) — Industrial Standard</option>
                <option value="F">Fahrenheit (°F)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Live Sensor Telemetry Refresh Rate
              </label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="w-full bg-industrial-800 border border-industrial-700 rounded-lg p-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="1.5">1.5 Seconds (High Fidelity)</option>
                <option value="3">3.0 Seconds (Default Edge Rate)</option>
                <option value="5">5.0 Seconds (Bandwidth Conservative)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                Theme / Control Room Preset
              </label>
              <div className="p-2 rounded-lg bg-industrial-950/80 border border-industrial-800 text-xs font-mono text-zinc-400">
                Dark Charcoal Industrial (High Contrast Fixed)
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Sensor Notification Thresholds */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-5">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-industrial-800">
            <BellRing className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              Safety Interlock Trigger Thresholds
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Temp limit */}
            <div className="p-3.5 rounded-lg bg-industrial-950/60 border border-industrial-800">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs text-zinc-300 font-semibold">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400" /> Max Temp Limit
                </span>
                <span className="text-[10px] font-mono text-rose-400">CRITICAL</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={tempThreshold}
                  onChange={(e) => setTempThreshold(e.target.value)}
                  className="w-full bg-industrial-800 border border-industrial-700 rounded p-1.5 text-xs font-mono text-white font-bold focus:outline-none focus:border-rose-500"
                />
                <span className="text-xs font-mono text-zinc-400">°C</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1.5">Triggers emergency 100% exhaust speed purge</p>
            </div>

            {/* Smoke limit */}
            <div className="p-3.5 rounded-lg bg-industrial-950/60 border border-industrial-800">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs text-zinc-300 font-semibold">
                  <CloudFog className="w-3.5 h-3.5 text-amber-400" /> Smoke Limit
                </span>
                <span className="text-[10px] font-mono text-amber-400">WARNING</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={smokeThreshold}
                  onChange={(e) => setSmokeThreshold(e.target.value)}
                  className="w-full bg-industrial-800 border border-industrial-700 rounded p-1.5 text-xs font-mono text-white font-bold focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs font-mono text-zinc-400">%</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1.5">Auto-boosts VFD frequency to &gt;85%</p>
            </div>

            {/* VOC limit */}
            <div className="p-3.5 rounded-lg bg-industrial-950/60 border border-industrial-800">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs text-zinc-300 font-semibold">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" /> VOC Threshold
                </span>
                <span className="text-[10px] font-mono text-cyan-400">WARNING</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={vocThreshold}
                  onChange={(e) => setVocThreshold(e.target.value)}
                  className="w-full bg-industrial-800 border border-industrial-700 rounded p-1.5 text-xs font-mono text-white font-bold focus:outline-none focus:border-cyan-500"
                />
                <span className="text-xs font-mono text-zinc-400">ppm</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1.5">Evaporation and gas aerosol detection</p>
            </div>

            {/* Power Surge */}
            <div className="p-3.5 rounded-lg bg-industrial-950/60 border border-industrial-800">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs text-zinc-300 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" /> Power Surge Cap
                </span>
                <span className="text-[10px] font-mono text-emerald-400">AUDIT</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={powerSurgeThreshold}
                  onChange={(e) => setPowerSurgeThreshold(e.target.value)}
                  className="w-full bg-industrial-800 border border-industrial-700 rounded p-1.5 text-xs font-mono text-white font-bold focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs font-mono text-zinc-400">kW</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1.5">Alerts on abnormal motor draw/jamming</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-industrial-950 shadow-subtle-glow transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE THRESHOLD POLICIES</span>
            </button>
          </div>
        </div>
      </form>

      {/* Section 3: Read-Only Connection Settings (Firebase & MQTT) */}
      <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-industrial-800">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              IoT Connection Settings (Read-Only Cluster Configuration)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
            TLS ENCRYPTED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
          {/* MQTT Broker Config */}
          <div className="p-4 rounded-lg bg-industrial-950/70 border border-industrial-800 space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold pb-2 border-b border-industrial-800">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>MQTT Broker (Raspberry Pi Local Bridge)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Broker Host:</span>
              <span className="text-zinc-200">192.168.1.100 (rpi-exhaust-gateway.local)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Port / Protocol:</span>
              <span className="text-zinc-200">1883 / MQTT over TCP</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Publish Topic:</span>
              <span className="text-emerald-400">kitchen/hoods/+/telemetry</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Command Topic:</span>
              <span className="text-cyan-400">kitchen/hoods/+/control</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">QoS Policy:</span>
              <span className="text-zinc-200">At least once (Level 1)</span>
            </div>
          </div>

          {/* Firebase RTDB Config */}
          <div className="p-4 rounded-lg bg-industrial-950/70 border border-industrial-800 space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold pb-2 border-b border-industrial-800">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Firebase Realtime Database (Cloud Telemetry)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Project ID:</span>
              <span className="text-zinc-200">exhaust-management-system</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Database Region:</span>
              <span className="text-zinc-200">europe-west1 (Belgium)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Target RTDB URI:</span>
              <span className="text-emerald-400 truncate max-w-[200px]" title="https://exhaust-management-system-default-rtdb.europe-west1.firebasedatabase.app">
                exhaust-management-system-default-rtdb...
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Auth Status:</span>
              <span className="text-emerald-400">Simulated / Fallback Mode Safe</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Stream Listener:</span>
              <span className="text-zinc-200">Active (Automatic Reconnect)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Architecture Pipeline Horizontal View */}
      <SystemHealth orientation="horizontal" />
    </div>
  );
}
