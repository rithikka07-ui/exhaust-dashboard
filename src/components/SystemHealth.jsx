import React from "react";
import {
  Cpu,
  Radio,
  Server,
  Database,
  MonitorCheck,
  Activity,
} from "lucide-react";

export default function SystemHealth({ orientation = "vertical" }) {
  const stages = [
    {
      id: "esp32",
      title: "ESP32 Sensor Nodes",
      subtitle: "6/6 Nodes Active",
      icon: Cpu,
      status: "ONLINE",
      metric: "40ms poll cycle",
      details: "DHT22, MQ-135, MQ-2, CT Clamp",
    },
    {
      id: "mqtt",
      title: "MQTT Broker",
      subtitle: "Port 1883 / TLS",
      icon: Radio,
      status: "CONNECTED",
      metric: "QoS 1 Reliable",
      details: "Mosquitto / Local Cluster",
    },
    {
      id: "rpi",
      title: "Raspberry Pi Controller",
      subtitle: "Edge Controller (Pi 4)",
      icon: Server,
      status: "ONLINE",
      metric: "CPU: 24% | 42°C",
      details: "Local VFD PID & Fallback Loop",
    },
    {
      id: "firebase",
      title: "Firebase RTDB",
      subtitle: "Cloud Telemetry Synced",
      icon: Database,
      status: "CONNECTED",
      metric: "Sync Latency: 12ms",
      details: "europe-west1 / Stream Active",
    },
    {
      id: "dashboard",
      title: "React Control Room",
      subtitle: "Dashboard Interface",
      icon: MonitorCheck,
      status: "ONLINE",
      metric: "Vite SPA / 60 FPS",
      details: "Industrial IoT UI v2.4",
    },
  ];

  if (orientation === "horizontal") {
    return (
      <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              End-to-End Edge-to-Cloud Data Pipeline
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            ALL PIPELINE NODES NOMINAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                className="relative rounded-lg bg-slate-50 border border-slate-200 p-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {stage.status}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-900 leading-snug">{stage.title}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">{stage.subtitle}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-600 flex items-center justify-between font-medium">
                  <span>{stage.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical Architecture Pipeline Visualization
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              System Architecture Health
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">
              Industrial IoT Telemetry Pipeline
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          5 / 5 ONLINE
        </span>
      </div>

      {/* Vertical Pipeline Nodes with Connectors */}
      <div className="relative pl-6 space-y-4">
        {/* Continuous background pipe line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-400 via-emerald-500 to-sky-500 opacity-60" />

        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div key={stage.id} className="relative flex items-start gap-3.5 group">
              {/* Node Pulse Dot */}
              <div className="relative z-10 -ml-6 w-9 h-9 rounded-lg bg-white border border-emerald-400 flex items-center justify-center text-emerald-600 shadow-2xs group-hover:border-emerald-500 transition-colors">
                <Icon className="w-4 h-4" />
              </div>

              {/* Node Details Card */}
              <div className="flex-1 rounded-lg bg-slate-50 border border-slate-200 p-3 transition-colors group-hover:border-slate-300">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-slate-900">{stage.title}</div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {stage.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 mt-1 font-mono">
                  <span>{stage.subtitle}</span>
                  <span className="text-emerald-700 font-semibold">{stage.metric}</span>
                </div>

                <div className="text-[10px] text-slate-500 mt-1">
                  {stage.details}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
