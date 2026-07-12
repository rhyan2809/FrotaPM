import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Vehicles } from './pages/Vehicles';
import { Maintenance } from './pages/Maintenance';
import { ServiceOrders } from './pages/ServiceOrders';
import { History } from './pages/History';
import { Tracking } from './pages/Tracking';
import { KPIs } from './pages/KPIs';
import { Reports } from './pages/Reports';
import { Users } from './pages/Users';
import { SettingsPage } from './pages/Settings';
import './styles/globals.css';

function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="*"
          element={
            token ? (
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/vehicles" element={<Vehicles />} />
                  <Route path="/maintenance" element={<Maintenance />} />
                  <Route path="/service-orders" element={<ServiceOrders />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/tracking" element={<Tracking />} />
                  <Route path="/kpis" element={<KPIs />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
