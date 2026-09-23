// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_YCxpbUd1hr9nbQLOe54kxzv4msUFQ3c",
  authDomain: "smart-exhaust-b6f30.firebaseapp.com",
  databaseURL: "https://smart-exhaust-b6f30-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-exhaust-b6f30",
  storageBucket: "smart-exhaust-b6f30.firebasestorage.app",
  messagingSenderId: "54432874071",
  appId: "1:54432874071:web:ae9642cd83544dbe472d12",
  measurementId: "G-9KE8GQWM5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);