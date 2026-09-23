import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import {
  Thermometer,
  CloudFog,
  Wind,
  Zap,
  Filter,
} from "lucide-react";
import { generateSensorTimeSeries } from "../services/mockData";
import { useHoods } from "../context/HoodContext";

// Custom light industrial tooltip
function CustomTooltip({ active, payload, label, unit, parameterName, threshold }) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const isAbove = threshold && value >= threshold;
    return (
      <div className="rounded-lg bg-white border border-slate-200 p-2.5 shadow-lg text-xs font-mono">
        <div className="text-slate-500 text-[10px] mb-1 font-semibold">{label}</div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">{parameterName}:</span>
          <span
            className={`font-bold text-sm ${
              isAbove ? "text-rose-600" : "text-emerald-700"
            }`}
          >
            {value} {unit}
          </span>
        </div>
        {threshold && (
          <div className="text-[10px] text-slate-500 mt-1 border-t border-slate-100 pt-1 font-medium">
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

  useEffect(() => {
    const data = generateSensorTimeSeries(timeRange, selectedHood);
    setChartData(data);
  }, [timeRange, selectedHood, lastTickTime]);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>Telemetry Filter:</span>
          </div>

          {/* Hood Select Dropdown */}
          <select
            value={selectedHood}
            onChange={(e) => setSelectedHood(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
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
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          {[
            { id: "1h", label: "1 Hour" },
            { id: "6h", label: "6 Hours" },
            { id: "today", label: "Today" },
            { id: "week", label: "This Week" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimeRange(t.id)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                timeRange === t.id
                  ? "bg-white text-emerald-700 border border-emerald-300 font-bold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 font-medium"
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
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Temperature History
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Degrees Celsius (°C)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              LIVE TICK
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
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
                <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'CRITICAL (75°C)', fill: '#dc2626', fontSize: 9, position: 'insideTopRight' }} />
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
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <CloudFog className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Smoke Density
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Optical Obscuration (%)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              LIVE TICK
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
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
                <ReferenceLine y={45} stroke="#d97706" strokeDasharray="3 3" label={{ value: 'WARNING (45%)', fill: '#d97706', fontSize: 9, position: 'insideTopRight' }} />
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

        {/* 3. VOC Chart */}
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  VOC Concentration
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Parts Per Million (ppm)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              LIVE TICK
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
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
                <ReferenceLine y={200} stroke="#0284c7" strokeDasharray="3 3" label={{ value: 'AIR PURGE (200 ppm)', fill: '#0284c7', fontSize: 9, position: 'insideTopRight' }} />
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
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Power Consumption
                </h3>
                <span className="text-[10px] text-slate-500 font-mono">Active Power Demand (kW)</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              LIVE TICK
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
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
                  stroke="#059669"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#059669', stroke: '#fff' }}
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
