/**
 * Mock Data Service for Smart Kitchen Exhaust Management System
 * Simulates commercial kitchen IoT sensor node metrics (ESP32 -> MQTT -> Pi -> Firebase)
 */

export const initialHoods = [
  {
    id: "H01",
    name: "Main Wok Station 1",
    zone: "Hot Line A",
    temperature: 68,
    smoke: 42,
    voc: 185,
    power: 1.8,
    energy: 12.4,
    activity: "HIGH",
    status: "ACTIVE",
    mode: "AUTO",
    isOn: true,
    speed: 85,
    lastUpdate: "Just now",
  },
  {
    id: "H02",
    name: "Salad Prep & Cold Station",
    zone: "Prep Line",
    temperature: 31,
    smoke: 8,
    voc: 52,
    power: 0.3,
    energy: 4.1,
    activity: "LOW",
    status: "IDLE",
    mode: "AUTO",
    isOn: true,
    speed: 15,
    lastUpdate: "Just now",
  },
  {
    id: "H03",
    name: "Tandoor & Charcoal Grill",
    zone: "Hot Line A",
    temperature: 82,
    smoke: 58,
    voc: 230,
    power: 2.2,
    energy: 14.8,
    activity: "HIGH",
    status: "ACTIVE",
    mode: "AUTO",
    isOn: true,
    speed: 95,
    lastUpdate: "Just now",
  },
  {
    id: "H04",
    name: "Commercial Deep Fryer Bank",
    zone: "Fry Station",
    temperature: 54,
    smoke: 29,
    voc: 142,
    power: 1.4,
    energy: 9.6,
    activity: "MEDIUM",
    status: "ACTIVE",
    mode: "AUTO",
    isOn: true,
    speed: 65,
    lastUpdate: "Just now",
  },
  {
    id: "H05",
    name: "Sauté & Flambé Range",
    zone: "Hot Line B",
    temperature: 62,
    smoke: 35,
    voc: 215,
    power: 1.6,
    energy: 10.2,
    activity: "MEDIUM",
    status: "ACTIVE",
    mode: "MANUAL",
    isOn: true,
    speed: 70,
    lastUpdate: "Just now",
  },
  {
    id: "H06",
    name: "Pastry & Baking Deck Oven",
    zone: "Bakery",
    temperature: 28,
    smoke: 4,
    voc: 28,
    power: 0.1,
    energy: 2.5,
    activity: "LOW",
    status: "IDLE",
    mode: "AUTO",
    isOn: false,
    speed: 0,
    lastUpdate: "3m ago",
  },
  {
    id: "H07",
    name: "Teppanyaki Griddle 1",
    zone: "Live Counter",
    temperature: 58,
    smoke: 33,
    voc: 160,
    power: 1.5,
    energy: 8.9,
    activity: "MEDIUM",
    status: "ACTIVE",
    mode: "AUTO",
    isOn: true,
    speed: 60,
    lastUpdate: "Just now",
  },
  {
    id: "H08",
    name: "Steam Kettle & Stockpots",
    zone: "Boiling Line",
    temperature: 46,
    smoke: 14,
    voc: 85,
    power: 0.8,
    energy: 6.2,
    activity: "LOW",
    status: "ACTIVE",
    mode: "AUTO",
    isOn: true,
    speed: 30,
    lastUpdate: "Just now",
  },
  {
    id: "H09",
    name: "Salamander Broiler",
    zone: "Finishing Pass",
    temperature: 49,
    smoke: 22,
    voc: 110,
    power: 1.1,
    energy: 5.7,
    activity: "MEDIUM",
    status: "ACTIVE",
    mode: "AUTO",
    isOn: true,
    speed: 55,
    lastUpdate: "Just now",
  },
  {
    id: "H10",
    name: "Scullery & High-Temp Dishwasher",
    zone: "Scullery",
    temperature: 38,
    smoke: 10,
    voc: 45,
    power: 0.5,
    energy: 4.8,
    activity: "LOW",
    status: "IDLE",
    mode: "MANUAL",
    isOn: true,
    speed: 25,
    lastUpdate: "Just now",
  },
  {
    id: "H11",
    name: "Rotisserie Roaster",
    zone: "Roast Station",
    temperature: 65,
    smoke: 38,
    voc: 175,
    power: 1.7,
    energy: 11.1,
    activity: "HIGH",
    status: "ACTIVE",
    mode: "AUTO",
    isOn: true,
    speed: 85,
    lastUpdate: "Just now",
  },
  {
    id: "H12",
    name: "Dim Sum Steamer Trolley",
    zone: "Live Counter",
    temperature: 35,
    smoke: 9,
    voc: 60,
    power: 0.4,
    energy: 3.9,
    activity: "LOW",
    status: "IDLE",
    mode: "AUTO",
    isOn: true,
    speed: 20,
    lastUpdate: "Just now",
  },
];

export const initialAlerts = [
  {
    id: "ALT-101",
    severity: "CRITICAL",
    category: "High Temperature",
    hoodId: "H03",
    hoodName: "Tandoor & Charcoal Grill",
    description: "Temperature exceeded safe threshold (82°C > 75°C trigger). Automated exhaust boosted to 95%.",
    timestamp: "10 mins ago",
    status: "ACTIVE",
  },
  {
    id: "ALT-102",
    severity: "WARNING",
    category: "High VOC",
    hoodId: "H05",
    hoodName: "Sauté & Flambé Range",
    description: "VOC level is above normal range (215 ppm > 200 ppm threshold). Check oil evaporation rate.",
    timestamp: "24 mins ago",
    status: "ACTIVE",
  },
  {
    id: "ALT-103",
    severity: "WARNING",
    category: "Excessive Energy Consumption",
    hoodId: "H02",
    hoodName: "Salad Prep & Cold Station",
    description: "Energy consumption is higher than expected for cold prep zone during non-peak period.",
    timestamp: "1 hour ago",
    status: "ACKNOWLEDGED",
  },
  {
    id: "ALT-104",
    severity: "CRITICAL",
    category: "Hood Offline",
    hoodId: "H06",
    hoodName: "Pastry & Baking Deck Oven",
    description: "ESP32 connection lost. MQTT heartbeat ping timed out after 3 retries.",
    timestamp: "2 hours ago",
    status: "ACTIVE",
  },
  {
    id: "ALT-105",
    severity: "INFORMATION",
    category: "System Automation",
    hoodId: "H01",
    hoodName: "Main Wok Station 1",
    description: "Hood 01 automatically switched to low-power mode following 5 minutes of low cooking activity.",
    timestamp: "3 hours ago",
    status: "RESOLVED",
  },
  {
    id: "ALT-106",
    severity: "INFORMATION",
    category: "Energy Optimization",
    hoodId: "H08",
    hoodName: "Steam Kettle & Stockpots",
    description: "Smart VFD frequency scaled down from 50Hz to 28Hz, saving 0.7 kWh in past hour.",
    timestamp: "4 hours ago",
    status: "RESOLVED",
  }
];

export const energyKpis = {
  todayConsumption: 84.6, // kWh
  energySaved: 27.4,      // kWh
  averagePower: 4.8,      // kW
  peakPower: 9.2,         // kW
  estimatedCost: 720,     // INR
  energySavingPercentage: 24.5, // %
  manualBaselineConsumption: 124.0, // kWh
};

/**
 * Generate 7 days daily energy comparison
 */
export const dailyEnergyHistory = [
  { day: "Mon", manual: 128, smart: 88.4, saved: 39.6 },
  { day: "Tue", manual: 122, smart: 84.0, saved: 38.0 },
  { day: "Wed", manual: 135, smart: 91.2, saved: 43.8 },
  { day: "Thu", manual: 118, smart: 79.5, saved: 38.5 },
  { day: "Fri", manual: 142, smart: 96.8, saved: 45.2 },
  { day: "Sat", manual: 156, smart: 104.5, saved: 51.5 },
  { day: "Sun (Today)", manual: 124, smart: 84.6, saved: 39.4 },
];

/**
 * Generate 24-hour profile of hourly power
 */
export const hourlyPowerData = [
  { hour: "00:00", manualKw: 3.2, smartKw: 0.8, savingsKw: 2.4 },
  { hour: "02:00", manualKw: 3.2, smartKw: 0.6, savingsKw: 2.6 },
  { hour: "04:00", manualKw: 3.2, smartKw: 0.8, savingsKw: 2.4 },
  { hour: "06:00", manualKw: 5.5, smartKw: 2.4, savingsKw: 3.1 },
  { hour: "07:00", manualKw: 7.8, smartKw: 4.5, savingsKw: 3.3 },
  { hour: "08:00", manualKw: 9.4, smartKw: 6.8, savingsKw: 2.6 },
  { hour: "09:00", manualKw: 8.9, smartKw: 5.9, savingsKw: 3.0 },
  { hour: "10:00", manualKw: 7.2, smartKw: 3.8, savingsKw: 3.4 },
  { hour: "11:00", manualKw: 8.8, smartKw: 5.2, savingsKw: 3.6 },
  { hour: "12:00", manualKw: 11.2, smartKw: 8.4, savingsKw: 2.8 },
  { hour: "13:00", manualKw: 11.8, smartKw: 9.2, savingsKw: 2.6 },
  { hour: "14:00", manualKw: 9.5, smartKw: 6.1, savingsKw: 3.4 },
  { hour: "15:00", manualKw: 6.8, smartKw: 2.5, savingsKw: 4.3 },
  { hour: "16:00", manualKw: 5.9, smartKw: 2.1, savingsKw: 3.8 },
  { hour: "17:00", manualKw: 7.4, smartKw: 4.2, savingsKw: 3.2 },
  { hour: "18:00", manualKw: 9.8, smartKw: 6.7, savingsKw: 3.1 },
  { hour: "19:00", manualKw: 11.9, smartKw: 8.9, savingsKw: 3.0 },
  { hour: "20:00", manualKw: 12.4, smartKw: 9.1, savingsKw: 3.3 },
  { hour: "21:00", manualKw: 10.5, smartKw: 7.3, savingsKw: 3.2 },
  { hour: "22:00", manualKw: 7.0, smartKw: 3.6, savingsKw: 3.4 },
  { hour: "23:00", manualKw: 4.5, smartKw: 1.2, savingsKw: 3.3 },
];

/**
 * Energy breakdown across all 12 hoods
 */
export const hoodEnergyBreakdown = [
  { hood: "H01", name: "Main Wok 1", kwh: 12.4, savedKwh: 4.8 },
  { hood: "H02", name: "Salad Prep", kwh: 4.1, savedKwh: 2.9 },
  { hood: "H03", name: "Tandoor", kwh: 14.8, savedKwh: 4.2 },
  { hood: "H04", name: "Fryer Bank", kwh: 9.6, savedKwh: 3.6 },
  { hood: "H05", name: "Sauté Pass", kwh: 10.2, savedKwh: 3.1 },
  { hood: "H06", name: "Bakery Oven", kwh: 2.5, savedKwh: 2.1 },
  { hood: "H07", name: "Teppanyaki", kwh: 8.9, savedKwh: 2.8 },
  { hood: "H08", name: "Kettles", kwh: 6.2, savedKwh: 2.2 },
  { hood: "H09", name: "Salamander", kwh: 5.7, savedKwh: 1.9 },
  { hood: "H10", name: "Scullery", kwh: 4.8, savedKwh: 1.4 },
  { hood: "H11", name: "Rotisserie", kwh: 11.1, savedKwh: 3.7 },
  { hood: "H12", name: "Dim Sum", kwh: 3.9, savedKwh: 1.6 },
];

/**
 * Generate time series for live sensor monitoring
 */
export function generateSensorTimeSeries(range = "1h", hoodId = "all") {
  const points = [];
  const now = new Date();
  
  let count = 20;
  let intervalMinutes = 3;

  if (range === "1h") {
    count = 20;
    intervalMinutes = 3;
  } else if (range === "6h") {
    count = 24;
    intervalMinutes = 15;
  } else if (range === "today") {
    count = 24;
    intervalMinutes = 60;
  } else if (range === "week") {
    count = 28;
    intervalMinutes = 360;
  }

  // Base multipliers depending on selected hood
  let tempBase = 58;
  let smokeBase = 32;
  let vocBase = 140;
  let powerBase = 1.4;

  if (hoodId === "H01") {
    tempBase = 68; smokeBase = 42; vocBase = 185; powerBase = 1.8;
  } else if (hoodId === "H02") {
    tempBase = 31; smokeBase = 8; vocBase = 52; powerBase = 0.3;
  } else if (hoodId === "H03") {
    tempBase = 80; smokeBase = 56; vocBase = 225; powerBase = 2.2;
  } else if (hoodId === "H04") {
    tempBase = 54; smokeBase = 28; vocBase = 138; powerBase = 1.4;
  } else if (hoodId === "H05") {
    tempBase = 62; smokeBase = 36; vocBase = 210; powerBase = 1.6;
  } else if (hoodId === "H06") {
    tempBase = 28; smokeBase = 5; vocBase = 26; powerBase = 0.1;
  }

  for (let i = count - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * intervalMinutes * 60 * 1000);
    const timeLabel = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Wave disturbance to simulate cooking cycles
    const cycle = Math.sin((count - i) / 2.5);
    const noise = (Math.random() - 0.5) * 4;

    const temp = Math.max(22, Math.round(tempBase + cycle * 12 + noise));
    const smoke = Math.max(2, Math.round(smokeBase + cycle * 14 + (Math.random() - 0.5) * 3));
    const voc = Math.max(15, Math.round(vocBase + cycle * 45 + (Math.random() - 0.5) * 10));
    const power = Math.max(0.1, +(powerBase + cycle * 0.4 + (Math.random() - 0.5) * 0.1).toFixed(2));

    points.push({
      time: timeLabel,
      temperature: temp,
      smoke: smoke,
      voc: voc,
      power: power,
      thresholdTemp: 75,
      thresholdSmoke: 45,
      thresholdVoc: 200,
    });
  }

  return points;
}

/**
 * Generate historical logs for the Historical Data table
 */
export function generateHistoricalLogs(limit = 60) {
  const logs = [];
  const hoodKeys = ["H01", "H02", "H03", "H04", "H05", "H06", "H07", "H08", "H09", "H10", "H11", "H12"];
  const now = new Date();

  for (let i = 0; i < limit; i++) {
    const hoodId = hoodKeys[i % hoodKeys.length];
    const pastMinutes = i * 6 + Math.floor(Math.random() * 4);
    const timestamp = new Date(now.getTime() - pastMinutes * 60 * 1000);
    
    const isHotStation = ["H01", "H03", "H05", "H11"].includes(hoodId);
    const isMediumStation = ["H04", "H07", "H09"].includes(hoodId);

    let temp, smoke, voc, power, energy, activity, status;

    if (isHotStation) {
      temp = Math.round(62 + Math.random() * 22);
      smoke = Math.round(35 + Math.random() * 28);
      voc = Math.round(160 + Math.random() * 90);
      power = +(1.5 + Math.random() * 0.8).toFixed(2);
      energy = +(10 + Math.random() * 6).toFixed(1);
      activity = "HIGH";
      status = "ACTIVE";
    } else if (isMediumStation) {
      temp = Math.round(48 + Math.random() * 15);
      smoke = Math.round(20 + Math.random() * 18);
      voc = Math.round(110 + Math.random() * 60);
      power = +(1.0 + Math.random() * 0.5).toFixed(2);
      energy = +(6 + Math.random() * 4).toFixed(1);
      activity = "MEDIUM";
      status = "ACTIVE";
    } else {
      temp = Math.round(28 + Math.random() * 10);
      smoke = Math.round(5 + Math.random() * 8);
      voc = Math.round(30 + Math.random() * 35);
      power = +(0.2 + Math.random() * 0.3).toFixed(2);
      energy = +(2 + Math.random() * 3).toFixed(1);
      activity = "LOW";
      status = i % 3 === 0 ? "IDLE" : "ACTIVE";
    }

    logs.push({
      id: `LOG-${1000 + i}`,
      timestamp: timestamp.toLocaleString('en-GB', { 
        year: 'numeric', month: 'short', day: '2-digit', 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
      }),
      rawDate: timestamp.toISOString().split('T')[0],
      hoodId,
      temperature: temp,
      smoke,
      voc,
      power,
      energy,
      activity,
      status,
    });
  }

  return logs;
}

/**
 * Export table data to CSV and trigger browser download
 */
export function exportToCsv(data, filename = "kitchen_exhaust_sensor_history.csv") {
  if (!data || !data.length) return;

  const headers = ["Timestamp", "Hood ID", "Temperature (°C)", "Smoke (%)", "VOC (ppm)", "Power (kW)", "Energy (kWh)", "Activity Level", "Status"];
  
  const rows = data.map(item => [
    `"${item.timestamp}"`,
    `"${item.hoodId}"`,
    item.temperature,
    item.smoke,
    item.voc,
    item.power,
    item.energy,
    `"${item.activity}"`,
    `"${item.status}"`
  ]);

  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Simulate live tick perturbation on an array of hoods
 */
export function simulateLiveTick(hoods) {
  return hoods.map(hood => {
    // If hood is switched OFF, keep it idle
    if (!hood.isOn) {
      return {
        ...hood,
        power: 0,
        speed: 0,
        activity: "LOW",
        status: "OFF",
        lastUpdate: "Just now",
      };
    }

    // Small random sensor fluctuations
    const tempDelta = Math.floor((Math.random() - 0.48) * 3);
    const smokeDelta = Math.floor((Math.random() - 0.48) * 4);
    const vocDelta = Math.floor((Math.random() - 0.48) * 10);

    const newTemp = Math.max(24, Math.min(95, hood.temperature + tempDelta));
    const newSmoke = Math.max(2, Math.min(95, hood.smoke + smokeDelta));
    const newVoc = Math.max(15, Math.min(380, hood.voc + vocDelta));

    // Dynamic cooking activity determination based on multi-sensor fusion:
    let calculatedActivity = "LOW";
    if (newTemp >= 60 || newSmoke >= 35 || newVoc >= 170) {
      calculatedActivity = "HIGH";
    } else if (newTemp >= 45 || newSmoke >= 20 || newVoc >= 95) {
      calculatedActivity = "MEDIUM";
    }

    // In AUTO mode, fan speed is automated by cooking activity level!
    let newSpeed = hood.speed;
    if (hood.mode === "AUTO") {
      if (calculatedActivity === "HIGH") {
        newSpeed = Math.min(100, Math.max(80, Math.round(85 + (newTemp - 60) * 0.5)));
      } else if (calculatedActivity === "MEDIUM") {
        newSpeed = Math.min(75, Math.max(45, Math.round(55 + (newSmoke - 20) * 0.8)));
      } else {
        newSpeed = Math.min(30, Math.max(10, Math.round(15 + (newTemp - 25) * 0.4)));
      }
    }

    // Power consumption correlates with fan speed (kW)
    const newPower = +(0.2 + (newSpeed / 100) * 1.9 + (Math.random() * 0.05)).toFixed(2);
    const newEnergy = +(hood.energy + 0.01).toFixed(2);
    const newStatus = newSpeed > 25 ? "ACTIVE" : "IDLE";

    return {
      ...hood,
      temperature: newTemp,
      smoke: newSmoke,
      voc: newVoc,
      activity: calculatedActivity,
      speed: newSpeed,
      power: newPower,
      energy: newEnergy,
      status: newStatus,
      lastUpdate: "Just now",
    };
  });
}
