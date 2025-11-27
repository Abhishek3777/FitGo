import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import 'antd/dist/reset.css';
import AddMeal from "./pages/AddMeal";
import TodayMeals from "./pages/TodayMeals";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import WorkoutLogger from "./pages/WorkoutLogger";
import WorkoutHistory from "./pages/WorkoutHistory";
import AISuggestion from "./pages/AISuggestion";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Hero from "./pages/Hero";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Hero />} />

        {/* PROTECTED ROUTES */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/workouts" 
          element={
            <ProtectedRoute>
              <WorkoutLogger />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/workouts/history" 
          element={
            <ProtectedRoute>
              <WorkoutHistory />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/ai" 
          element={
            <ProtectedRoute>
              <AISuggestion />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
