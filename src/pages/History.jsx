import React, { useState, useMemo } from "react";
import {
  History as HistoryIcon,
  Download,
  Search,
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

  // Chart data from current filtered slice
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
        return "#059669";
      case "energy":
      default:
        return "#8b5cf6";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <HistoryIcon className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Historical Telemetry & Audit Logs
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sensor database records, energy consumption audit trails, and compliance exports
          </p>
        </div>

        {/* Working Export CSV Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT CSV ({filteredLogs.length} Records)</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
        {/* Hood selector */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Station Filter
          </label>
          <select
            value={selectedHood}
            onChange={(e) => {
              setSelectedHood(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
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
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Telemetry Metric
          </label>
          <select
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
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
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Search Timestamp / Status
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search timestamp, status, or activity..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Historical Trend Chart */}
      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Historical Trend Curve: {selectedSensor.toUpperCase()}
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">
                Showing recent {chartData.length} records for {selectedHood === "all" ? "All Hoods" : selectedHood}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300">
            AUDIT VERIFIED
          </span>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSensor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getSensorColor()} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={getSensorColor()} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} fontFamily="monospace" />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", fontSize: "12px", fontFamily: "monospace", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
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
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Telemetry Records Table
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-600">
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
            <tbody className="divide-y divide-slate-100">
              {paginatedLogs.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{row.timestamp}</td>
                  <td className="px-4 py-2.5 font-bold text-slate-900 whitespace-nowrap">{row.hoodId}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        row.temperature >= 75
                          ? "text-rose-600"
                          : row.temperature >= 55
                          ? "text-amber-600"
                          : "text-slate-800"
                      }`}
                    >
                      {row.temperature}°C
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        row.smoke >= 45 ? "text-rose-600" : row.smoke >= 25 ? "text-amber-600" : "text-slate-800"
                      }`}
                    >
                      {row.smoke}%
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-700 whitespace-nowrap">{row.voc} ppm</td>
                  <td className="px-4 py-2.5 text-emerald-700 font-bold whitespace-nowrap">{row.power} kW</td>
                  <td className="px-4 py-2.5 text-slate-700 whitespace-nowrap">{row.energy} kWh</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        row.activity === "HIGH"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : row.activity === "MEDIUM"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {row.activity}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        row.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
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
        <div className="p-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
          <div className="text-slate-500">
            Page <span className="text-slate-900 font-bold">{currentPage}</span> of{" "}
            <span className="text-slate-900 font-bold">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 text-slate-700"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 text-slate-700"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
