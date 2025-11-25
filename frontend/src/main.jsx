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
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workouts" element={<WorkoutLogger />} />
        <Route path="/workouts/history" element={<WorkoutHistory />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);
