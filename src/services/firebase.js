/**
 * Firebase Realtime Database Integration & Fallback Service
 * 
 * Modular architecture: if environment variables or credentials are absent,
 * the service safely flags `isFirebaseConfigured: false` and enables full mock data mode.
 * 
 * Suggested Firebase Schema:
 * hoods/
 *   ├── H01/ { id, name, temperature, smoke, voc, power, energy, activity, status, mode, speed }
 *   └── ...
 * energy/
 *   ├── today/ { consumption, saved, avgPower, peakPower, cost, percentageSaved }
 *   ├── dailyHistory/ [ { day, manualKwh, smartKwh, savedKwh } ]
 *   └── hourlyProfile/ [ { hour, powerKw, baselineKw } ]
 * sensors/
 *   ├── live/ { [hoodId]: { timestamp, temperature, smoke, voc, power } }
 *   └── history/ [ { timestamp, hoodId, temperature, smoke, voc, power } ]
 * alerts/
 *   └── [alertId]/ { id, severity, hoodId, title, description, timestamp, status }
 * systemStatus/
 *   └── { esp32Nodes: "CONNECTED", mqttBroker: "CONNECTED", rpiController: "ONLINE", firebase: "CONNECTED" }
 */

import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

let database = null;
let isFirebaseConfigured = false;

try {
  // Only attempt initialization if essential configs are present and not empty
  if (firebaseConfig.apiKey && firebaseConfig.databaseURL && firebaseConfig.projectId) {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    database = getDatabase(app);
    isFirebaseConfigured = true;
    console.info("[Firebase] Realtime Database initialized successfully.");
  } else {
    // Graceful fallback to mock data mode
    console.info("[Firebase] Credentials not detected. Operating in simulated IoT / Mock Mode.");
  }
} catch (error) {
  console.warn("[Firebase] Initialization skipped or failed safely:", error.message);
  isFirebaseConfigured = false;
  database = null;
}

export { database, isFirebaseConfigured, firebaseConfig };

/**
 * Example helper hook/function to subscribe to live hood updates if Firebase is active
 */
export function subscribeToHoods(callback) {
  if (!isFirebaseConfigured || !database) {
    return () => {};
  }
  const hoodsRef = ref(database, "hoods");
  return onValue(hoodsRef, (snapshot) => {
    const val = snapshot.val();
    if (val && callback) callback(val);
  }, (err) => {
    console.warn("[Firebase] Subscription error:", err.message);
  });
}

/**
 * Example helper to sync a hood state back to Firebase
 */
export async function updateHoodStateInFirebase(hoodId, patch) {
  if (!isFirebaseConfigured || !database) return false;
  try {
    const hoodRef = ref(database, `hoods/${hoodId}`);
    await set(hoodRef, patch);
    return true;
  } catch (err) {
    console.warn(`[Firebase] Failed updating hood ${hoodId}:`, err.message);
    return false;
  }
}
