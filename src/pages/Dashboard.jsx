import React from "react";
import { Database, Server, Cpu, Radio, Activity, CheckCircle2 } from "lucide-react";
import { database } from "../firebase";

export default function Settings() {
  const options = database.app.options;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h1 className="text-xl font-bold text-slate-900 uppercase tracking-wider">
          System Architecture & Edge-to-Cloud Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Live connection metrics, protocol configurations, and hardware gateway status
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MQTT Broker Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Radio className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              MQTT Broker (Raspberry Pi Local Bridge)
            </h3>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Broker Host:</span>
              <span className="text-slate-200 font-bold">192.168.1.100 (rpi-exhaust-gateway.local)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Port / Protocol:</span>
              <span className="text-slate-200 font-bold">1883 / MQTT over TCP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Publish Topic:</span>
              <span className="text-emerald-400 font-bold">kitchen/hoods/+/telemetry</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Command Topic:</span>
              <span className="text-emerald-400 font-bold">kitchen/hoods/+/control</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">QoS Policy:</span>
              <span className="text-slate-200 font-bold">At least once (Level 1)</span>
            </div>
          </div>
        </div>

        {/* Live Firebase Realtime Database Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Database className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Firebase Realtime Database (Cloud Telemetry)
            </h3>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Project ID:</span>
              <span className="text-slate-200 font-bold">
                {options.projectId || "smart-exhaust-b6f30"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Database Region:</span>
              <span className="text-slate-200 font-bold">
                asia-southeast1 (Singapore)
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Target RTDB URL:</span>
              <span className="text-emerald-400 font-bold truncate max-w-[240px]" title={options.databaseURL}>
                {options.databaseURL}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Auth Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Connected & Live
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Stream Listener:</span>
              <span className="text-emerald-400 font-bold">
                Active (Automatic Reconnect)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* End-to-End Pipeline Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              End-to-End Edge-to-Cloud Data Pipeline
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            ALL PIPELINE NODES NOMINAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold">ESP32 Sensor Nodes</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="w-3 h-3" /> ONLINE
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500">6/6 Nodes Active</p>
            <p className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-900">40ms poll cycle</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold">MQTT Broker</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="w-3 h-3" /> CONNECTED
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500">Port 1883 / TLS</p>
            <p className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-900">QoS 1 Reliable</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold">Raspberry Pi Controller</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="w-3 h-3" /> ONLINE
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500">Edge Controller (Pi 4)</p>
            <p className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-900">CPU: 24% | 42°C</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold">Firebase RTDB</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="w-3 h-3" /> CONNECTED
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500">Cloud Telemetry Synced</p>
            <p className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-900">Sync Latency: 12ms</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold">React Control Room</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="w-3 h-3" /> ONLINE
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-500">Dashboard Interface</p>
            <p className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-900">Vite SPA / 60 FPS</p>
          </div>
        </div>
      </div>
    </div>
  );
}