import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
// ... retain all existing imports

export default function Dashboard() {
  const {
    hoods,
    energy,
    totalHoods,
    activeHoods,
    activeAlertsCount,
    batchSetMode,
    batchSetPower,
    toggleHoodPower,
    toggleHoodMode,
    setHoodSpeed,
  } = useHoods();

  // Local state for live hardware telemetries
  const [firebaseData, setFirebaseData] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, "/");
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFirebaseData(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const [focalHoodId, setFocalHoodId] = useState("H01");
  const focalHoodBase = hoods.find((h) => h.id === focalHoodId) || hoods[0];

  // Merge live Firebase values if looking at H01 (Live Station)
  const focalHood = focalHoodId === "H01" && firebaseData ? {
    ...focalHoodBase,
    power: firebaseData.power ?? focalHoodBase.power,
    isOn: firebaseData.fanStatus ? firebaseData.fanStatus === "ON" : focalHoodBase.isOn,
  } : focalHoodBase;

  // ... keep the rest of your exact render logic unchanged
