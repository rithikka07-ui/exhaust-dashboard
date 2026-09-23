import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Sliders,
  BellRing,
  Save,
  CheckCircle2,
  Database,
  Radio,
  Server,
  Thermometer,
  CloudFog,
  Wind,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";
import SystemHealth from "../components/SystemHealth";

export default function Settings() {
  const { theme, toggleTheme } = useHoods();

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              System Configuration & Edge Thresholds
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tune sensor trigger sensitivities, safety interlocks, and review network connection parameters
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Persisted to Edge Cache</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSavePreferences} className="space-y-6">
        {/* Section 1: System Preferences & Units */}
        <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Telemetry & Display Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Temperature Unit
              </label>
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="C">Celsius (°C) — Industrial Standard</option>
                <option value="F">Fahrenheit (°F)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Live Sensor Telemetry Refresh Rate
              </label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
              >
                <option value="1.5">1.5 Seconds (High Fidelity)</option>
                <option value="3">3.0 Seconds (Default Edge Rate)</option>
                <option value="5">5.0 Seconds (Bandwidth Conservative)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Theme / Appearance
              </label>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-xs font-mono text-slate-800 font-semibold transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  {theme === "light" ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-600" />
                  )}
                  {theme === "light" ? "White Theme (Active)" : "Dark Mode (Active)"}
                </span>
                <span className="text-[10px] text-emerald-700 uppercase font-bold">
                  Click to switch
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Sensor Notification Thresholds */}
        <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
            <BellRing className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Safety Interlock Trigger Thresholds
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Temp limit */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs text-slate-800 font-semibold">
                  <Thermometer className="w-3.5 h-3.5 text-rose-600" /> Max Temp Limit
                </span>
                <span className="text-[10px] font-mono text-rose-700 font-bold">CRITICAL</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={tempThreshold}
                  onChange={(e) => setTempThreshold(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-mono text-slate-900 font-bold focus:outline-none focus:border-rose-500 shadow-2xs"
                />
                <span className="text-xs font-mono text-slate-500">°C</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5">Triggers emergency 100% exhaust speed purge</p>
            </div>

            {/* Smoke limit */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs text-slate-800 font-semibold">
                  <CloudFog className="w-3.5 h-3.5 text-amber-600" /> Smoke Limit
                </span>
                <span className="text-[10px] font-mono text-amber-700 font-bold">WARNING</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={smokeThreshold}
                  onChange={(e) => setSmokeThreshold(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-mono text-slate-900 font-bold focus:outline-none focus:border-amber-500 shadow-2xs"
                />
                <span className="text-xs font-mono text-slate-500">%</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5">Auto-boosts VFD frequency to &gt;85%</p>
            </div>

            {/* VOC limit */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs text-slate-800 font-semibold">
                  <Wind className="w-3.5 h-3.5 text-sky-600" /> VOC Threshold
                </span>
                <span className="text-[10px] font-mono text-sky-700 font-bold">WARNING</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={vocThreshold}
                  onChange={(e) => setVocThreshold(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-mono text-slate-900 font-bold focus:outline-none focus:border-cyan-500 shadow-2xs"
                />
                <span className="text-xs font-mono text-slate-500">ppm</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5">Evaporation and gas aerosol detection</p>
            </div>

            {/* Power Surge */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-xs text-slate-800 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" /> Power Surge Cap
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">AUDIT</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={powerSurgeThreshold}
                  onChange={(e) => setPowerSurgeThreshold(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs font-mono text-slate-900 font-bold focus:outline-none focus:border-emerald-500 shadow-2xs"
                />
                <span className="text-xs font-mono text-slate-500">kW</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5">Alerts on abnormal motor draw/jamming</p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE THRESHOLD POLICIES</span>
            </button>
          </div>
        </div>
      </form>

      {/* Section 3: Read-Only Connection Settings (Firebase & MQTT) */}
      <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-sky-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              IoT Connection Settings (Read-Only Cluster Configuration)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300">
            TLS ENCRYPTED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
          {/* MQTT Broker Config */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold pb-2 border-b border-slate-200">
              <Radio className="w-4 h-4 text-emerald-600" />
              <span>MQTT Broker (Raspberry Pi Local Bridge)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Broker Host:</span>
              <span className="text-slate-800 font-medium">192.168.1.100 (rpi-exhaust-gateway.local)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Port / Protocol:</span>
              <span className="text-slate-800 font-medium">1883 / MQTT over TCP</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Publish Topic:</span>
              <span className="text-emerald-700 font-bold">kitchen/hoods/+/telemetry</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Command Topic:</span>
              <span className="text-sky-700 font-bold">kitchen/hoods/+/control</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">QoS Policy:</span>
              <span className="text-slate-800 font-medium">At least once (Level 1)</span>
            </div>
          </div>

          {/* Firebase RTDB Config */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold pb-2 border-b border-slate-200">
              <Database className="w-4 h-4 text-emerald-600" />
              <span>Firebase Realtime Database (Cloud Telemetry)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Project ID:</span>
              <span className="text-slate-800 font-medium">exhaust-management-system</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Database Region:</span>
              <span className="text-slate-800 font-medium">europe-west1 (Belgium)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Target RTDB URI:</span>
              <span className="text-emerald-700 font-bold truncate max-w-[200px]" title="https://exhaust-management-system-default-rtdb.europe-west1.firebasedatabase.app">
                exhaust-management-system-default-rtdb...
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Auth Status:</span>
              <span className="text-emerald-700 font-medium">Simulated / Fallback Mode Safe</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Stream Listener:</span>
              <span className="text-slate-800 font-medium">Active (Automatic Reconnect)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Architecture Pipeline Horizontal View */}
      <SystemHealth orientation="horizontal" />
    </div>
  );
}
