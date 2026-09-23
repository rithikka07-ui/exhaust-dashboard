import React, { useState, useEffect } from "react";
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
  ChevronRight,
} from "lucide-react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
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
    batchSetMode,
    batchSetPower,
    toggleHoodPower,
    toggleHoodMode,
    setHoodSpeed,
  } = useHoods();

  // Local state for live hardware telemetries
  const [firebaseData, setFirebaseData] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, "/");
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("🔥 Firebase Live Data Received:", data);
        if (data) {
          setFirebaseData(data);
        }
      },
      (error) => {
        console.error("❌ Firebase Subscription Error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Focal master hood control (defaults to H01)
  const [focalHoodId, setFocalHoodId] = useState("H01");
  const focalHoodBase = hoods.find((h) => h.id === focalHoodId) || hoods[0];

  // Merge live Firebase values if looking at H01 (Live ESP32 Station)
  const focalHood =
    focalHoodId === "H01" && firebaseData
      ? {
          ...focalHoodBase,
          power: firebaseData.power ?? focalHoodBase.power,
          isOn: firebaseData.fanStatus ? firebaseData.fanStatus === "ON" : focalHoodBase.isOn,
        }
      : focalHoodBase;

  // First 6 hoods for dashboard status grid
  const dashboardHoods = hoods.slice(0, 6);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 5 Summary KPI Cards */}
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
          value={firebaseData?.energy ?? energy.todayConsumption}
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

      {/* Cooking Activity Causal Chain */}
      <ActivityIndicator targetHoodId="H01" />

      {/* Dashboard Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Hood Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Kitchen Hood Status Grid
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  Primary Line (01–06)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time sensory feedback, automated VFD modulation & individual overrides
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/hoods"
                className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <span>View All 12 Hoods</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {dashboardHoods.map((hood) => (
              <HoodCard key={hood.id} hood={hood.id === "H01" ? focalHood : hood} />
            ))}
          </div>
        </div>

        {/* Right 1 Col: Focal Control Panel */}
        <div className="space-y-6">
          <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Exhaust Control Panel
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono">Focal Station Override</span>
                </div>
              </div>

              <select
                value={focalHoodId}
                onChange={(e) => setFocalHoodId(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs font-mono text-slate-800 rounded px-2 py-1 focus:outline-none focus:border-emerald-500 font-semibold"
              >
                {hoods.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.id} ({h.name.split(" ")[0]})
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 space-y-3.5">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Station Identity:</span>
                  <span className="font-bold text-slate-900 font-mono">{focalHood.id} — {focalHood.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Operating Mode:</span>
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                      focalHood.mode === "AUTO"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-amber-50 text-amber-800 border-amber-300"
                    }`}
                  >
                    {focalHood.mode}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Current Load / Power:</span>
                  <span className="font-mono font-bold text-emerald-700">{focalHood.power} kW</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">
                  Operating Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (focalHood.mode !== "AUTO") toggleHoodMode(focalHood.id);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      focalHood.mode === "AUTO"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    AUTO MODE
                  </button>

                  <button
                    onClick={() => {
                      if (focalHood.mode !== "MANUAL") toggleHoodMode(focalHood.id);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      focalHood.mode === "MANUAL"
                        ? "bg-amber-50 text-amber-800 border-amber-300 shadow-2xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                    MANUAL OVERRIDE
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block mb-1.5">
                  Exhaust Relay Status
                </label>
                <button
                  onClick={() => toggleHoodPower(focalHood.id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-mono font-bold border flex items-center justify-center gap-2 transition-all ${
                    focalHood.isOn
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300"
                      : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {focalHood.isOn ? "EXHAUST FAN ONLINE (CLICK TO POWER OFF)" : "EXHAUST FAN SHUTDOWN (CLICK TO POWER ON)"}
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
                    Fan Speed Modulation
                  </label>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
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
                      ? "bg-slate-200 accent-emerald-600 cursor-not-allowed opacity-80"
                      : "bg-slate-200 accent-emerald-600 hover:accent-emerald-500"
                  }`}
                />

                {focalHood.mode === "AUTO" && (
                  <p className="text-[11px] text-slate-500 mt-1.5 font-mono italic">
                    * In AUTO mode, fan speed is continuously governed by sensory activity fusion.
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => batchSetMode("AUTO")}
                  className="flex-1 py-1.5 px-2 rounded bg-slate-100 hover:bg-slate-200 text-[11px] font-mono font-semibold text-slate-700 border border-slate-200 text-center"
                >
                  Set All 12 to Auto
                </button>
                <button
                  onClick={() => batchSetPower(true)}
                  className="flex-1 py-1.5 px-2 rounded bg-emerald-50 hover:bg-emerald-100 text-[11px] font-mono font-bold text-emerald-700 border border-emerald-300 text-center"
                >
                  Power All On
                </button>
              </div>
            </div>
          </div>

          <SystemHealth orientation="vertical" />
        </div>
      </div>

      {/* Sensor Chart Section */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Live Sensor Telemetry Streams
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold animate-pulse">
                LIVE IoT FEED
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Continuous time-series tracking of Temperature, Smoke, VOC, and Real-Time Power
            </p>
          </div>

          <Link
            to="/monitoring"
            className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
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