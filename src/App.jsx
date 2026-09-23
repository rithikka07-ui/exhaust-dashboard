import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HoodProvider } from "./context/HoodContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Pages
import Dashboard from "./pages/Dashboard";
import Hoods from "./pages/Hoods";
import Monitoring from "./pages/Monitoring";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import History from "./pages/History";
import Settings from "./pages/Settings";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <HoodProvider>
      <div className="min-h-screen bg-industrial-950 text-zinc-100 flex flex-col antialiased">
        {/* Sidebar Navigation */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area Offset by Sidebar on Desktop */}
        <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
          {/* Header Bar */}
          <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Page Viewport */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/hoods" element={<Hoods />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </HoodProvider>
  );
}
