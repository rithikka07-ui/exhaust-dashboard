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
  Legend,
} from "recharts";
import {
  Zap,
  TrendingDown,
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

// Custom Dark Industrial Tooltip
function EnergyCustomTooltip({ active, payload, label, unit = "kWh" }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-industrial-900 border border-industrial-700 p-2.5 shadow-xl text-xs font-mono">
        <div className="text-zinc-400 font-semibold mb-1.5">{label}</div>
        {payload.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 py-0.5">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}:
            </span>
            <span className="font-bold text-white">
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
  // Before vs After Automation Dataset (Comparing standard un-throttled manual 100% vs Smart VFD)
  const beforeAfterComparison = [
    {
      category: "Daily Energy Demand",
      manual: energyKpis.manualBaselineConsumption,
      smart: energyKpis.todayConsumption,
      saved: energyKpis.energySaved,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Prominent Narrative Callout Banner */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-950/70 via-industrial-900 to-emerald-950/70 border border-emerald-500/40 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-subtle-glow">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Energy Optimization Verified
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Smart control reduces unnecessary exhaust operation.
            </h3>
            <p className="text-xs text-zinc-300 mt-0.5">
              Automated sensor-triggered VFD modulation prevents commercial hoods from running at 100% power during idle and prep periods.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-industrial-950/80 px-4 py-2.5 rounded-lg border border-emerald-500/30 font-mono text-center shrink-0">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Today's Savings</div>
            <div className="text-xl font-bold text-emerald-400">+{energyKpis.energySaved} kWh</div>
          </div>
          <div className="border-l border-industrial-800 pl-4">
            <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Reduction</div>
            <div className="text-xl font-bold text-emerald-400">24.5%</div>
          </div>
        </div>
      </div>

      {/* Grid of 4 Energy Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart 1: Daily Energy Consumption (7 Days) */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Daily Energy Consumption
                </h4>
                <span className="text-[10px] text-zinc-400 font-mono">Last 7 Days (kWh)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-zinc-600" /> Manual
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-emerald-500" /> Smart VFD
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyEnergyHistory} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2c44" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <Tooltip content={<EnergyCustomTooltip unit="kWh" />} />
                <Bar dataKey="manual" name="Manual Operation" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="smart" name="Smart Automation" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Before vs After Automation Comparison */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Before vs After Automation
                </h4>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Manual: 124 kWh vs Smart: 84.6 kWh
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              -31.8% LOAD REDUCTION
            </span>
          </div>

          <div className="h-64 w-full flex flex-col justify-between pt-4">
            <div className="space-y-4">
              {/* Manual baseline bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-zinc-400">Manual Operation (Continuous High Speed)</span>
                  <span className="text-zinc-300 font-bold">124.0 kWh</span>
                </div>
                <div className="w-full h-8 bg-industrial-800 rounded-lg overflow-hidden flex items-center px-3 border border-industrial-700">
                  <div className="h-full bg-slate-600 rounded-l flex items-center px-2 text-[11px] font-mono text-zinc-200" style={{ width: '100%' }}>
                    100% Un-optimized Energy Baseline
                  </div>
                </div>
              </div>

              {/* Smart Automation bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-emerald-400 font-semibold">Smart IoT Automated Operation</span>
                  <span className="text-emerald-400 font-bold">84.6 kWh</span>
                </div>
                <div className="w-full h-8 bg-industrial-800 rounded-lg overflow-hidden flex items-center border border-emerald-500/30">
                  <div
                    className="h-full bg-emerald-500 flex items-center px-3 text-[11px] font-mono font-bold text-industrial-950 transition-all duration-700"
                    style={{ width: `${(84.6 / 124.0) * 100}%` }}
                  >
                    68.2% Consumed
                  </div>
                  <div
                    className="h-full bg-emerald-950/80 border-l border-emerald-500/40 flex items-center px-3 text-[11px] font-mono font-bold text-emerald-400"
                    style={{ width: `${(39.4 / 124.0) * 100}%` }}
                  >
                    31.8% Saved (39.4 kWh)
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Summary Footnote */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-industrial-800 text-center font-mono text-xs">
              <div className="p-2 rounded bg-industrial-950/60 border border-industrial-800">
                <div className="text-[10px] text-zinc-400">Manual Baseline</div>
                <div className="font-bold text-zinc-300">124.0 kWh</div>
              </div>
              <div className="p-2 rounded bg-industrial-950/60 border border-industrial-800">
                <div className="text-[10px] text-zinc-400">Smart Consumed</div>
                <div className="font-bold text-emerald-400">84.6 kWh</div>
              </div>
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30">
                <div className="text-[10px] text-emerald-400">Net Conserved</div>
                <div className="font-bold text-emerald-300">27.4 kWh (₹720)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 3: Hourly Power Consumption (24 Hours Profile) */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Hourly Power Consumption Profile
                </h4>
                <span className="text-[10px] text-zinc-400 font-mono">Kitchen Operating Shift (kW)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-500" /> Manual
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Smart VFD
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyPowerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2c44" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
                <Tooltip content={<EnergyCustomTooltip unit="kW" />} />
                <Line
                  type="monotone"
                  dataKey="manualKw"
                  name="Manual Constant Power"
                  stroke="#64748b"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="smartKw"
                  name="Smart Automated Power"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Energy Consumption by Hood */}
        <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Energy Consumption by Hood
                </h4>
                <span className="text-[10px] text-zinc-400 font-mono">Hood 01 to Hood 12 (kWh)</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold">
              12 ACTIVE ZONES
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoodEnergyBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2c44" vertical={false} />
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
