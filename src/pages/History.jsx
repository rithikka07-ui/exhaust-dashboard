import React, { useState, useMemo } from "react";
import {
  History as HistoryIcon,
  Download,
  Filter,
  Search,
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useHoods } from "../context/HoodContext";
import { generateHistoricalLogs, exportToCsv } from "../services/mockData";

export default function History() {
  const { hoods } = useHoods();

  const [logs] = useState(() => generateHistoricalLogs(100));
  const [selectedHood, setSelectedHood] = useState("all");
  const [selectedSensor, setSelectedSensor] = useState("temperature");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesHood = selectedHood === "all" || log.hoodId === selectedHood;
      const matchesSearch =
        log.hoodId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.activity.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesHood && matchesSearch;
    });
  }, [logs, selectedHood, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(start, start + itemsPerPage);
  }, [filteredLogs, currentPage, itemsPerPage]);

  // Chart data from current filtered slice (reversed for chronological display)
  const chartData = useMemo(() => {
    return [...filteredLogs.slice(0, 25)].reverse().map((item) => ({
      time: item.timestamp.split(",")[1]?.trim() || item.timestamp,
      temperature: item.temperature,
      smoke: item.smoke,
      voc: item.voc,
      power: item.power,
      energy: item.energy,
    }));
  }, [filteredLogs]);

  const handleExport = () => {
    exportToCsv(filteredLogs, `kitchen_exhaust_telemetry_${selectedHood}_${Date.now()}.csv`);
  };

  const getSensorColor = () => {
    switch (selectedSensor) {
      case "temperature":
        return "#ef4444";
      case "smoke":
        return "#f59e0b";
      case "voc":
        return "#0284c7";
      case "power":
        return "#10b981";
      case "energy":
      default:
        return "#8b5cf6";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-industrial-900 border border-industrial-750">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <HistoryIcon className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Historical Telemetry & Audit Logs
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Sensor database records, energy consumption audit trails, and compliance exports
          </p>
        </div>

        {/* Working Export CSV Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 shadow-subtle-glow transition-all"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT CSV ({filteredLogs.length} Records)</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3.5 rounded-xl bg-industrial-900 border border-industrial-750">
        {/* Hood selector */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            Station Filter
          </label>
          <select
            value={selectedHood}
            onChange={(e) => {
              setSelectedHood(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-industrial-800 border border-industrial-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Hoods Combined</option>
            {hoods.map((h) => (
              <option key={h.id} value={h.id}>
                {h.id} — {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sensor selector */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            Telemetry Metric
          </label>
          <select
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
            className="w-full bg-industrial-800 border border-industrial-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="temperature">Temperature (°C)</option>
            <option value="smoke">Smoke Density (%)</option>
            <option value="voc">VOC Level (ppm)</option>
            <option value="power">Power Demand (kW)</option>
            <option value="energy">Cumulative Energy (kWh)</option>
          </select>
        </div>

        {/* Search */}
        <div className="sm:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
            Search Timestamp / Status
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search timestamp, status, or activity..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 bg-industrial-800 border border-industrial-700 rounded-lg text-xs font-mono text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Historical Trend Chart */}
      <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Historical Trend Curve: {selectedSensor.toUpperCase()}
              </h3>
              <span className="text-[10px] text-zinc-400 font-mono">
                Showing recent {chartData.length} records for {selectedHood === "all" ? "All Hoods" : selectedHood}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
            AUDIT VERIFIED
          </span>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSensor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getSensorColor()} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={getSensorColor()} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2c44" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
              <Tooltip
                contentStyle={{ backgroundColor: "#0d121c", borderColor: "#25334c", fontSize: "12px", fontFamily: "monospace" }}
              />
              <Area
                type="monotone"
                dataKey={selectedSensor}
                stroke={getSensorColor()}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSensor)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Data Table */}
      <div className="rounded-xl bg-industrial-900 border border-industrial-750 overflow-hidden">
        <div className="p-4 border-b border-industrial-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Telemetry Records Table
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-industrial-950/80 border-b border-industrial-800 text-[11px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Hood</th>
                <th className="px-4 py-3">Temperature</th>
                <th className="px-4 py-3">Smoke</th>
                <th className="px-4 py-3">VOC</th>
                <th className="px-4 py-3">Power</th>
                <th className="px-4 py-3">Energy</th>
                <th className="px-4 py-3">Activity</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-industrial-800/60">
              {paginatedLogs.map((row) => (
                <tr key={row.id} className="hover:bg-industrial-850/60 transition-colors">
                  <td className="px-4 py-2.5 text-zinc-300 whitespace-nowrap">{row.timestamp}</td>
                  <td className="px-4 py-2.5 font-bold text-white whitespace-nowrap">{row.hoodId}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        row.temperature >= 75
                          ? "text-rose-400"
                          : row.temperature >= 55
                          ? "text-amber-400"
                          : "text-zinc-200"
                      }`}
                    >
                      {row.temperature}°C
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        row.smoke >= 45 ? "text-rose-400" : row.smoke >= 25 ? "text-amber-400" : "text-zinc-200"
                      }`}
                    >
                      {row.smoke}%
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-zinc-200 whitespace-nowrap">{row.voc} ppm</td>
                  <td className="px-4 py-2.5 text-emerald-400 font-bold whitespace-nowrap">{row.power} kW</td>
                  <td className="px-4 py-2.5 text-zinc-300 whitespace-nowrap">{row.energy} kWh</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        row.activity === "HIGH"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : row.activity === "MEDIUM"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {row.activity}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        row.status === "ACTIVE"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="p-3 border-t border-industrial-800 flex items-center justify-between text-xs font-mono">
          <div className="text-zinc-400">
            Page <span className="text-white font-bold">{currentPage}</span> of{" "}
            <span className="text-white font-bold">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded bg-industrial-800 border border-industrial-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-industrial-750 text-zinc-200"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded bg-industrial-800 border border-industrial-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-industrial-750 text-zinc-200"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
