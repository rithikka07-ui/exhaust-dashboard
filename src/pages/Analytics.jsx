import React from "react";
import {
  Zap,
  Leaf,
  Activity,
  TrendingUp,
  IndianRupee,
  Percent,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";
import StatCard from "../components/StatCard";
import EnergyChart from "../components/EnergyChart";

export default function Analytics() {
  const { energy } = useHoods();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Zap className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Energy & Cost Optimization Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-world power savings achieved through dynamic demand-controlled ventilation (DCV)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-700 font-bold px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 shadow-2xs">
            ₹720 / Shift Estimated Savings
          </span>
        </div>
      </div>

      {/* 6 KPI Cards as specified */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <StatCard
          title="Today's Consumption"
          value={energy.todayConsumption}
          unit="kWh"
          icon={Zap}
          trend="-31.8% vs Manual"
          trendDirection="down"
          trendColor="green"
          subtext="Actual Usage"
        />

        <StatCard
          title="Energy Saved"
          value={energy.energySaved}
          unit="kWh"
          icon={Leaf}
          trend="+27.4 kWh Saved"
          trendDirection="up"
          trendColor="green"
          subtext="Conserved Today"
        />

        <StatCard
          title="Average Power"
          value={energy.averagePower}
          unit="kW"
          icon={Activity}
          trend="Nominal Load"
          trendDirection="neutral"
          trendColor="blue"
          subtext="Continuous Draw"
        />

        <StatCard
          title="Peak Power"
          value={energy.peakPower}
          unit="kW"
          icon={TrendingUp}
          trend="Dinner Rush Max"
          trendDirection="up"
          trendColor="yellow"
          subtext="Cap Limit: 12 kW"
        />

        <StatCard
          title="Estimated Cost"
          value={`₹${energy.estimatedCost}`}
          unit=""
          icon={IndianRupee}
          trend="₹380 Saved"
          trendDirection="down"
          trendColor="green"
          subtext="Per-Shift Cost"
        />

        <StatCard
          title="Energy Saving"
          value={`${energy.energySavingPercentage}%`}
          unit=""
          icon={Percent}
          trend="ROI Target Met"
          trendDirection="up"
          trendColor="green"
          subtext="Overall Ratio"
        />
      </div>

      {/* 4 Energy Charts & Narrative Banner Component */}
      <EnergyChart />
    </div>
  );
}
