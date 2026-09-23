import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  Thermometer,
  CloudFog,
  Wind,
  Zap,
  Filter,
  RefreshCw,
} from "lucide-react";
import { generateSensorTimeSeries } from "../services/mockData";
import { useHoods } from "../context/HoodContext";

// Custom dark industrial tooltip
function CustomTooltip({ active, payload, label, unit, parameterName, threshold }) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const isAbove = threshold && value >= threshold;
    return (
      <div className="rounded-lg bg-industrial-900 border border-industrial-700 p-2.5 shadow-xl text-xs font-mono">
        <div className="text-zinc-400 text-[10px] mb-1">{label}</div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{parameterName}:</span>
          <span
            className={`font-bold text-sm ${
              isAbove ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {value} {unit}
          </span>
        </div>
        {threshold && (
          <div className="text-[10px] text-zinc-400 mt-1 border-t border-industrial-800 pt-1">
            Safe Threshold: {threshold} {unit}
          </div>
        )}
      </div>
    );
  }
  return null;
}

export default function SensorChart({ defaultHood = "all", compact = false }) {
  const { hoods, lastTickTime } = useHoods();
  const [selectedHood, setSelectedHood] = useState(defaultHood);
  const [timeRange, setTimeRange] = useState("1h");
  const [chartData, setChartData] = useState([]);

  // Refresh / regenerate time series on tick or filter changes
  useEffect(() => {
    const data = generateSensorTimeSeries(timeRange, selectedHood);
    setChartData(data);
  }, [timeRange, selectedHood, lastTickTime]);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-industrial-900 border border-industrial-750">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Telemetry Filter:</span>
          </div>

          {/* Hood Select Dropdown */}
          <select
            value={selectedHood}
            onChange={(e) => setSelectedHood(e.target.value)}
            className="bg-industrial-800 border border-industrial-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Hoods Combined</option>
            {hoods.map((h) => (
              <option key={h.id} value={h.id}>
                {h.id} — {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range Filter Buttons */}
        <div className="flex items-center gap-1 bg-industrial-950 p-1 rounded-lg border border-industrial-750">
          {[
            { id: "1h", label: "1 Hour" },
            { id: "6h", label: "6 Hours" },
            { id: "today", label: "Today" },
            { id: "week", label: "This Week" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimeRange(t.id)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                timeRange === t.id
                  ? "bg-industrial-800 text-emerald-400 border border-emerald-500/40 font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Line Charts Grid */}
      <div className={`grid grid-cols-1 ${compact ? "lg:grid-cols-2" : "xl:grid-cols-2"} gap-4`}>
        {/* 1. Temperature Chart */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Temperature History
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono">Degrees Celsius (°C)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE TICK
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2c44" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  fontFamily="monospace"
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  fontFamily="monospace"
                  domain={[20, 100]}
                />
                <Tooltip
                  content={<CustomTooltip unit="°C" parameterName="Temperature" threshold={75} />}
                />
                <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'CRITICAL (75°C)', fill: '#ef4444', fontSize: 9, position: 'insideTopRight' }} />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#ef4444', stroke: '#fff' }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Smoke Density Chart */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <CloudFog className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Smoke Density
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono">Optical Obscuration (%)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE TICK
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2c44" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  fontFamily="monospace"
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  fontFamily="monospace"
                  domain={[0, 100]}
                />
                <Tooltip
                  content={<CustomTooltip unit="%" parameterName="Smoke Level" threshold={45} />}
                />
                <ReferenceLine y={45} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'WARNING (45%)', fill: '#f59e0b', fontSize: 9, position: 'insideTopRight' }} />
                <Line
                  type="monotone"
                  dataKey="smoke"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#f59e0b', stroke: '#fff' }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. VOC (Volatile Organic Compounds) Chart */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  VOC Concentration
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono">Parts Per Million (ppm)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE TICK
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2c44" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  fontFamily="monospace"
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  fontFamily="monospace"
                  domain={[0, 400]}
                />
                <Tooltip
                  content={<CustomTooltip unit="ppm" parameterName="VOC" threshold={200} />}
                />
                <ReferenceLine y={200} stroke="#38bdf8" strokeDasharray="3 3" label={{ value: 'AIR PURGE (200 ppm)', fill: '#38bdf8', fontSize: 9, position: 'insideTopRight' }} />
                <Line
                  type="monotone"
                  dataKey="voc"
                  stroke="#0284c7"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#0284c7', stroke: '#fff' }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Power Demand Chart */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Power Consumption
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono">Active Power Demand (kW)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE TICK
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2c44" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  fontFamily="monospace"
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  fontFamily="monospace"
                  domain={[0, 4]}
                />
                <Tooltip
                  content={<CustomTooltip unit="kW" parameterName="Power" />}
                />
                <Line
                  type="monotone"
                  dataKey="power"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#10b981', stroke: '#fff' }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
