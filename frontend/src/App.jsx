import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FlowChart from "./components/FlowChart/FlowChart";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

function MainLayout() {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-dvh w-dvw text-[#153448] p-4 md:p-6">
      <div className="w-[90vw] h-[85vh] mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#153448] to-[#3C5B6F] bg-clip-text text-transparent flex-1 text-center">
            Cold Email Scheduler
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2.5 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-100"
          >
            Logout
          </button>
        </div>
        <div className="h-[calc(100%-6rem)]">
          <FlowChart />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
