import React, { createContext, useContext, useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

export const HoodContext = createContext();

export function HoodProvider({ children }) {
  // Empty initial state - NO fake numbers
  const [hoods, setHoods] = useState([
    { id: "H01", name: "Station H01", temperature: 0, smoke: 0, power: 0, speed: 0, isOn: false, mode: "AUTO", zone: "Line A" },
    { id: "H02", name: "Station H02", temperature: 0, smoke: 0, power: 0, speed: 0, isOn: false, mode: "AUTO", zone: "Line A" },
    { id: "H03", name: "Station H03", temperature: 0, smoke: 0, power: 0, speed: 0, isOn: false, mode: "AUTO", zone: "Line A" },
    { id: "H04", name: "Station H04", temperature: 0, smoke: 0, power: 0, speed: 0, isOn: false, mode: "AUTO", zone: "Line B" },
    { id: "H05", name: "Station H05", temperature: 0, smoke: 0, power: 0, speed: 0, isOn: false, mode: "AUTO", zone: "Line B" },
    { id: "H06", name: "Station H06", temperature: 0, smoke: 0, power: 0, speed: 0, isOn: false, mode: "AUTO", zone: "Line B" },
  ]);

  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [isPiConnected, setIsPiConnected] = useState(false);

  useEffect(() => {
    // Check dynamic connection to Firebase
    const connectedRef = ref(database, ".info/connected");
    const unsubscribeConnected = onValue(connectedRef, (snap) => {
      setIsFirebaseConnected(snap.val() === true);
    });

    // Subscribe to live sensor telemetry at kitchenExhaust/current
    const sensorRef = ref(database, "kitchenExhaust/current");
    const unsubscribeSensors = onValue(
      sensorRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setIsPiConnected(true);
          setHoods((prevHoods) =>
            prevHoods.map((hood) => {
              if (hood.id === "H01") {
                return {
                  ...hood,
                  temperature: Number(data.temperature) || 0,
                  smoke: Number(data.smoke) || 0,
                  power: Number(data.power) || 0,
                  speed: Number(data.speed) || 0,
                  isOn: data.isOn !== undefined ? Boolean(data.isOn) : hood.isOn,
                };
              }
              return hood;
            })
          );
        } else {
          setIsPiConnected(false);
        }
      },
      (error) => {
        console.warn("Firebase listener error:", error.message);
        setIsPiConnected(false);
      }
    );

    return () => {
      unsubscribeConnected();
      unsubscribeSensors();
    };
  }, []);

  const toggleHoodPower = (id) => {
    setHoods((prev) =>
      prev.map((h) => (h.id === id ? { ...h, isOn: !h.isOn } : h))
    );
  };

  const toggleHoodMode = (id) => {
    setHoods((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, mode: h.mode === "AUTO" ? "MANUAL" : "AUTO" } : h
      )
    );
  };

  const setHoodSpeed = (id, speed) => {
    setHoods((prev) =>
      prev.map((h) => (h.id === id ? { ...h, speed: Number(speed) } : h))
    );
  };

  const activeHoods = hoods.filter((h) => h.isOn).length;
  const totalHoods = hoods.length;
  const activeAlertsCount = hoods.filter(
    (h) => h.temperature > 40 || h.smoke > 300
  ).length;

  return (
    <HoodContext.Provider
      value={{
        hoods,
        totalHoods,
        activeHoods,
        activeAlertsCount,
        isFirebaseConnected,
        isPiConnected,
        toggleHoodPower,
        toggleHoodMode,
        setHoodSpeed,
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

export default HoodProvider;