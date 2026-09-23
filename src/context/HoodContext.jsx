import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  initialHoods,
  initialAlerts,
  energyKpis,
  simulateLiveTick,
} from "../services/mockData";

const HoodContext = createContext(null);

export function HoodProvider({ children }) {
  const [hoods, setHoods] = useState(initialHoods);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [energy, setEnergy] = useState(energyKpis);
  const [isLiveSimulation, setIsLiveSimulation] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(3000); // 3 seconds
  const [lastTickTime, setLastTickTime] = useState(new Date());
  const [activityMessage, setActivityMessage] = useState(null);

  // Live IoT sensor feed simulation loop
  useEffect(() => {
    if (!isLiveSimulation) return;

    const interval = setInterval(() => {
      setHoods((prevHoods) => {
        const updated = simulateLiveTick(prevHoods);
        return updated;
      });
      setLastTickTime(new Date());
    }, simulationSpeed);

    return () => clearInterval(interval);
  }, [isLiveSimulation, simulationSpeed]);

  // Toggle Hood Power (ON / OFF)
  const toggleHoodPower = useCallback((id) => {
    setHoods((prev) =>
      prev.map((hood) => {
        if (hood.id === id) {
          const nextState = !hood.isOn;
          return {
            ...hood,
            isOn: nextState,
            status: nextState ? (hood.speed > 20 ? "ACTIVE" : "IDLE") : "OFF",
            speed: nextState ? (hood.mode === "AUTO" ? (hood.activity === "HIGH" ? 85 : 40) : hood.speed) : 0,
            power: nextState ? (hood.speed > 20 ? 1.5 : 0.4) : 0,
            lastUpdate: "Just now",
          };
        }
        return hood;
      })
    );
  }, []);

  // Toggle Mode (AUTO / MANUAL)
  const toggleHoodMode = useCallback((id) => {
    setHoods((prev) =>
      prev.map((hood) => {
        if (hood.id === id) {
          const nextMode = hood.mode === "AUTO" ? "MANUAL" : "AUTO";
          let adjustedSpeed = hood.speed;
          if (nextMode === "AUTO" && hood.isOn) {
            adjustedSpeed = hood.activity === "HIGH" ? 85 : hood.activity === "MEDIUM" ? 60 : 20;
          }
          return {
            ...hood,
            mode: nextMode,
            speed: adjustedSpeed,
            lastUpdate: "Just now",
          };
        }
        return hood;
      })
    );
  }, []);

  // Set Speed in MANUAL mode
  const setHoodSpeed = useCallback((id, speed) => {
    setHoods((prev) =>
      prev.map((hood) => {
        if (hood.id === id) {
          const newPower = +(0.2 + (speed / 100) * 1.9).toFixed(2);
          return {
            ...hood,
            speed: Number(speed),
            power: hood.isOn ? newPower : 0,
            status: hood.isOn && speed > 20 ? "ACTIVE" : "IDLE",
            lastUpdate: "Just now",
          };
        }
        return hood;
      })
    );
  }, []);

  // Interactive Demo Trigger: Cooking Spike (Sensors shoot up)
  const triggerCookingSpike = useCallback((id = "H01") => {
    setHoods((prev) =>
      prev.map((hood) => {
        if (hood.id === id) {
          return {
            ...hood,
            isOn: true,
            temperature: 78,
            smoke: 52,
            voc: 240,
            activity: "HIGH",
            speed: hood.mode === "AUTO" ? 90 : hood.speed,
            power: 2.1,
            status: "ACTIVE",
            lastUpdate: "Just now",
          };
        }
        return hood;
      })
    );
    setActivityMessage({
      type: "spike",
      hoodId: id,
      text: `High cooking activity detected at ${id} — Exhaust automatically surged to 90%!`,
      time: new Date(),
    });
  }, []);

  // Interactive Demo Trigger: Cooking Cooldown (Sensors fall)
  const triggerCoolDown = useCallback((id = "H01") => {
    setHoods((prev) =>
      prev.map((hood) => {
        if (hood.id === id) {
          return {
            ...hood,
            isOn: true,
            temperature: 32,
            smoke: 8,
            voc: 45,
            activity: "LOW",
            speed: hood.mode === "AUTO" ? 20 : hood.speed,
            power: 0.4,
            status: "IDLE",
            lastUpdate: "Just now",
          };
        }
        return hood;
      })
    );
    setActivityMessage({
      type: "cooldown",
      hoodId: id,
      text: `Cooking activity reduced at ${id} — Exhaust automatically decelerated to 20% to conserve energy!`,
      time: new Date(),
    });
  }, []);

  // Acknowledge Alert
  const acknowledgeAlert = useCallback((id) => {
    setAlerts((prev) =>
      prev.map((alt) => (alt.id === id ? { ...alt, status: "ACKNOWLEDGED" } : alt))
    );
  }, []);

  // Resolve Alert
  const resolveAlert = useCallback((id) => {
    setAlerts((prev) =>
      prev.map((alt) => (alt.id === id ? { ...alt, status: "RESOLVED" } : alt))
    );
  }, []);

  // Batch Mode change
  const batchSetMode = useCallback((mode) => {
    setHoods((prev) =>
      prev.map((h) => ({
        ...h,
        mode,
        speed: mode === "AUTO" ? (h.activity === "HIGH" ? 85 : h.activity === "MEDIUM" ? 60 : 20) : h.speed,
      }))
    );
  }, []);

  // Batch Power toggle
  const batchSetPower = useCallback((isOn) => {
    setHoods((prev) =>
      prev.map((h) => ({
        ...h,
        isOn,
        status: isOn ? (h.speed > 20 ? "ACTIVE" : "IDLE") : "OFF",
        power: isOn ? +(0.3 + (h.speed / 100) * 1.8).toFixed(2) : 0,
      }))
    );
  }, []);

  // Computed summary metrics
  const totalHoods = hoods.length;
  const activeHoods = hoods.filter((h) => h.isOn && h.status === "ACTIVE").length;
  const activeAlertsCount = alerts.filter((a) => a.status === "ACTIVE").length;
  const currentTotalPower = +hoods.reduce((acc, h) => acc + (h.isOn ? h.power : 0), 0).toFixed(1);

  return (
    <HoodContext.Provider
      value={{
        hoods,
        alerts,
        energy,
        isLiveSimulation,
        setIsLiveSimulation,
        simulationSpeed,
        setSimulationSpeed,
        lastTickTime,
        activityMessage,
        setActivityMessage,
        toggleHoodPower,
        toggleHoodMode,
        setHoodSpeed,
        triggerCookingSpike,
        triggerCoolDown,
        acknowledgeAlert,
        resolveAlert,
        batchSetMode,
        batchSetPower,
        totalHoods,
        activeHoods,
        activeAlertsCount,
        currentTotalPower,
      }}
    >
      {children}
    </HoodContext.Provider>
  );
}

export function useHoods() {
  const context = useContext(HoodContext);
  if (!context) {
    throw new Error("useHoods must be used within a HoodProvider");
  }
  return context;
}
