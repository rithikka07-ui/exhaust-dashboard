import React, { useState, useMemo } from "react";
import {
  Fan,
  Search,
  Filter,
  Sparkles,
  Power,
  RotateCcw,
  Zap,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useHoods } from "../context/HoodContext";
import HoodCard from "../components/HoodCard";

export default function Hoods() {
  const {
    hoods,
    totalHoods,
    activeHoods,
    currentTotalPower,
    batchSetMode,
    batchSetPower,
  } = useHoods();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");

  // Filtered hoods list
  const filteredHoods = useMemo(() => {
    return hoods.filter((hood) => {
      const matchesSearch =
        hood.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hood.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hood.zone.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && hood.isOn && hood.status === "ACTIVE") ||
        (statusFilter === "idle" && hood.isOn && hood.status === "IDLE") ||
        (statusFilter === "off" && !hood.isOn);

      const matchesActivity =
        activityFilter === "all" || hood.activity.toLowerCase() === activityFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesActivity;
    });
  }, [hoods, searchQuery, statusFilter, activityFilter]);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner & Batch Operations */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-industrial-900 border border-industrial-750">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Fan className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Commercial Kitchen Exhaust Network (12 Hoods)
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Centralized management across Hot Lines, Fryers, Bakery, and Preparation zones
          </p>
        </div>

        {/* Global Batch Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => batchSetMode("AUTO")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 transition-all"
            title="Set all 12 hoods to automated activity-driven mode"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All to Auto</span>
          </button>

          <button
            onClick={() => batchSetMode("MANUAL")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold bg-industrial-800 hover:bg-industrial-750 text-amber-300 border border-amber-500/30 transition-all"
            title="Switch all 12 hoods to manual speed override"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>All to Manual</span>
          </button>

          <button
            onClick={() => batchSetPower(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold bg-industrial-800 hover:bg-industrial-750 text-zinc-200 border border-industrial-700 transition-all"
          >
            <Power className="w-3.5 h-3.5 text-emerald-400" />
            <span>Power All On</span>
          </button>
        </div>
      </div>

      {/* Network Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-industrial-900 border border-industrial-750">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Total Network</span>
          <div className="font-mono text-xl font-bold text-white mt-1">{totalHoods} Units</div>
        </div>
        <div className="p-3 rounded-lg bg-industrial-900 border border-industrial-750">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Active Operational</span>
          <div className="font-mono text-xl font-bold text-emerald-400 mt-1">{activeHoods} Active</div>
        </div>
        <div className="p-3 rounded-lg bg-industrial-900 border border-industrial-750">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Current Power Draw</span>
          <div className="font-mono text-xl font-bold text-emerald-400 mt-1">{currentTotalPower} kW</div>
        </div>
        <div className="p-3 rounded-lg bg-industrial-900 border border-industrial-750">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Automation Rate</span>
          <div className="font-mono text-xl font-bold text-cyan-400 mt-1">
            {Math.round((hoods.filter(h => h.mode === "AUTO").length / totalHoods) * 100)}% Auto
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-industrial-900 border border-industrial-750">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Hood ID (H01), station name, or kitchen zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-industrial-800 border border-industrial-700 rounded-lg text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-industrial-800 border border-industrial-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Status: All</option>
            <option value="active">Active Only</option>
            <option value="idle">Idle Only</option>
            <option value="off">Powered Off</option>
          </select>

          {/* Activity Filter */}
          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value)}
            className="bg-industrial-800 border border-industrial-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Activity: All</option>
            <option value="high">High Activity</option>
            <option value="medium">Medium Activity</option>
            <option value="low">Low Activity</option>
          </select>
        </div>
      </div>

      {/* 12 Hoods Grid */}
      {filteredHoods.length === 0 ? (
        <div className="text-center py-12 rounded-xl bg-industrial-900 border border-industrial-750 text-zinc-400 font-mono text-xs">
          No hoods match the selected search or filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredHoods.map((hood) => (
            <HoodCard key={hood.id} hood={hood} />
          ))}
        </div>
      )}
    </div>
  );
}
