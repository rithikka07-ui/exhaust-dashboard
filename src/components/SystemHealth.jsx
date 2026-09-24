import React from "react";
import { useHoods } from "../context/HoodContext";

export default function SystemHealth() {
  const { isPiConnected, isFirebaseConnected } = useHoods();

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs space-y-3">
      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
        System Architecture Health
      </h3>

      <div className="space-y-2 text-xs font-mono">
        {/* Raspberry Pi Connection */}
        <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
          <span className="text-slate-600 font-semibold">Raspberry Pi</span>
          <span
            className={`px-2 py-0.5 rounded font-bold ${
              isPiConnected
                ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                : "bg-rose-50 text-rose-700 border border-rose-300"
            }`}
          >
            {isPiConnected ? "• Connected" : "• Offline"}
          </span>
        </div>

        {/* Firebase Realtime Database */}
        <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
          <span className="text-slate-600 font-semibold">Firebase RTDB</span>
          <span
            className={`px-2 py-0.5 rounded font-bold ${
              isFirebaseConnected
                ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                : "bg-amber-50 text-amber-700 border border-amber-300"
            }`}
          >
            {isFirebaseConnected ? "• Connected" : "• Connecting..."}
          </span>
        </div>
      </div>
    </div>
  );
}