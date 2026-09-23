import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Zap,
  Sparkles,
  Award,
  Layers,
  BarChart3,
  Clock,
} from "lucide-react";
import {
  dailyEnergyHistory,
  hourlyPowerData,
  hoodEnergyBreakdown,
  energyKpis,
} from "../services/mockData";

// Custom Light Industrial Tooltip
function EnergyCustomTooltip({ active, payload, label, unit = "kWh" }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white border border-slate-200 p-2.5 shadow-lg text-xs font-mono">
        <div className="text-slate-500 font-semibold mb-1.5">{label}</div>
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 py-0.5">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}:
            </span>
            <span className="font-bold text-slate-900">
              {item.value} {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function EnergyChart() {
  return (
    <div className="space-y-6">
      {/* Prominent Narrative Callout Banner */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Energy Optimization Verified
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Smart control reduces unnecessary exhaust operation.
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Automated sensor-triggered VFD modulation prevents commercial hoods from running at 100% power during idle and prep periods.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-lg border border-emerald-200 font-mono text-center shrink-0 shadow-2xs">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Today's Savings</div>
            <div className="text-xl font-bold text-emerald-700">+{energyKpis.energySaved} kWh</div>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Reduction</div>
            <div className="text-xl font-bold text-emerald-700">24.5%</div>
          </div>
        </div>
      </div>

      {/* Grid of 4 Energy Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart 1: Daily Energy Consumption (7 Days) */}
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Daily Energy Consumption
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">Last 7 Days (kWh)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-slate-400" /> Manual
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-emerald-500" /> Smart VFD
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyEnergyHistory} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <Tooltip content={<EnergyCustomTooltip unit="kWh" />} />
                <Bar dataKey="manual" name="Manual Operation" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="smart" name="Smart Automation" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Before vs After Automation Comparison */}
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Before vs After Automation
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">
                  Manual: 124 kWh vs Smart: 84.6 kWh
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              -31.8% LOAD REDUCTION
            </span>
          </div>

          <div className="h-64 w-full flex flex-col justify-between pt-4">
            <div className="space-y-4">
              {/* Manual baseline bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-600">Manual Operation (Continuous High Speed)</span>
                  <span className="text-slate-800 font-bold">124.0 kWh</span>
                </div>
                <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden flex items-center px-3 border border-slate-200">
                  <div className="h-full bg-slate-400 rounded-l flex items-center px-2 text-[11px] font-mono text-white" style={{ width: '100%' }}>
                    100% Un-optimized Energy Baseline
                  </div>
                </div>
              </div>

              {/* Smart Automation bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-emerald-700 font-semibold">Smart IoT Automated Operation</span>
                  <span className="text-emerald-700 font-bold">84.6 kWh</span>
                </div>
                <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden flex items-center border border-emerald-300">
                  <div
                    className="h-full bg-emerald-500 flex items-center px-3 text-[11px] font-mono font-bold text-white transition-all duration-700"
                    style={{ width: `${(84.6 / 124.0) * 100}%` }}
                  >
                    68.2% Consumed
                  </div>
                  <div
                    className="h-full bg-emerald-50 border-l border-emerald-300 flex items-center px-3 text-[11px] font-mono font-bold text-emerald-800"
                    style={{ width: `${(39.4 / 124.0) * 100}%` }}
                  >
                    31.8% Saved (39.4 kWh)
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Summary Footnote */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center font-mono text-xs">
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500">Manual Baseline</div>
                <div className="font-bold text-slate-800">124.0 kWh</div>
              </div>
              <div className="p-2 rounded bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500">Smart Consumed</div>
                <div className="font-bold text-emerald-700">84.6 kWh</div>
              </div>
              <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
                <div className="text-[10px] text-emerald-700">Net Conserved</div>
                <div className="font-bold text-emerald-800">27.4 kWh (₹720)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 3: Hourly Power Consumption (24 Hours Profile) */}
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Hourly Power Consumption Profile
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">Kitchen Operating Shift (kW)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400" /> Manual
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Smart VFD
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyPowerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <Tooltip content={<EnergyCustomTooltip unit="kW" />} />
                <Line
                  type="monotone"
                  dataKey="manualKw"
                  name="Manual Constant Power"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="smartKw"
                  name="Smart Automated Power"
                  stroke="#059669"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Energy Consumption by Hood */}
        <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Energy Consumption by Hood
                </h4>
                <span className="text-[10px] text-slate-500 font-mono">Hood 01 to Hood 12 (kWh)</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold">
              12 ACTIVE ZONES
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoodEnergyBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="hood" stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <Tooltip content={<EnergyCustomTooltip unit="kWh" />} />
                <Bar dataKey="kwh" name="Today Consumption" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="savedKwh" name="Energy Saved" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
