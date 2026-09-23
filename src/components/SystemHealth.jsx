import React from "react";
import {
  Cpu,
  Radio,
  Server,
  Database,
  MonitorCheck,
  CheckCircle2,
  Wifi,
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
      statusColor: "emerald",
      details: "DHT22, MQ-135, MQ-2, CT Clamp",
    },
    {
      id: "mqtt",
      title: "MQTT Broker",
      subtitle: "Port 1883 / TLS",
      icon: Radio,
      status: "CONNECTED",
      metric: "QoS 1 Reliable",
      statusColor: "emerald",
      details: "Mosquitto / Local Cluster",
    },
    {
      id: "rpi",
      title: "Raspberry Pi Controller",
      subtitle: "Edge Controller (Pi 4)",
      icon: Server,
      status: "ONLINE",
      metric: "CPU: 24% | 42°C",
      statusColor: "emerald",
      details: "Local VFD PID & Fallback Loop",
    },
    {
      id: "firebase",
      title: "Firebase RTDB",
      subtitle: "Cloud Telemetry Synced",
      icon: Database,
      status: "CONNECTED",
      metric: "Sync Latency: 12ms",
      statusColor: "emerald",
      details: "europe-west1 / Stream Active",
    },
    {
      id: "dashboard",
      title: "React Control Room",
      subtitle: "Dashboard Interface",
      icon: MonitorCheck,
      status: "ONLINE",
      metric: "Vite SPA / 60 FPS",
      statusColor: "emerald",
      details: "Industrial IoT UI v2.4",
    },
  ];

  if (orientation === "horizontal") {
    return (
      <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              End-to-End Edge-to-Cloud Data Pipeline
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ALL PIPELINE NODES NOMINAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                className="relative rounded-lg bg-industrial-950/80 border border-industrial-750 p-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {stage.status}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-white leading-snug">{stage.title}</div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5">{stage.subtitle}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-industrial-800/80 text-[10px] font-mono text-zinc-400 flex items-center justify-between">
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
    <div className="rounded-xl bg-industrial-900 border border-industrial-750 p-5">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-industrial-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              System Architecture Health
            </h3>
            <span className="text-[10px] text-zinc-400 font-mono">
              Industrial IoT Telemetry Pipeline
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          5 / 5 ONLINE
        </span>
      </div>

      {/* Vertical Pipeline Nodes with Connectors */}
      <div className="relative pl-6 space-y-4">
        {/* Continuous background pipe line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-400 to-cyan-500 opacity-60" />

        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div key={stage.id} className="relative flex items-start gap-3.5 group">
              {/* Node Pulse Dot */}
              <div className="relative z-10 -ml-6 w-9 h-9 rounded-lg bg-industrial-900 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-subtle-glow group-hover:border-emerald-400 transition-colors">
                <Icon className="w-4 h-4" />
              </div>

              {/* Node Details Card */}
              <div className="flex-1 rounded-lg bg-industrial-950/70 border border-industrial-800 p-3 transition-colors group-hover:border-industrial-700">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-xs text-white">{stage.title}</div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {stage.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1 font-mono">
                  <span>{stage.subtitle}</span>
                  <span className="text-emerald-400/90">{stage.metric}</span>
                </div>

                <div className="text-[10px] text-zinc-400 mt-1">
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
