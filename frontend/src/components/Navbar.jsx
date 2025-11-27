import React, { useState } from "react";
import { Layout, Button, Drawer, Menu, Dropdown } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  DashboardOutlined,
  FireOutlined,
  BarChartOutlined,
  HistoryOutlined,
  RobotOutlined,
  LoginOutlined,
  FormOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Workout dropdown items (for desktop)
  const workoutMenu = {
    items: [
      {
        key: "log",
        label: "Log Workout",
        icon: <BarChartOutlined />,
        onClick: () => navigate("/workouts"),
      },
      {
        key: "history",
        label: "Workout History",
        icon: <HistoryOutlined />,
        onClick: () => navigate("/workouts/history"),
      },
    ],
  };

  return (
    <>
      {/* 🔥 NAVBAR */}
      <Header
        style={{
          height: "62px",
          background: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* FitGo Logo */}
        <div
          onClick={() => navigate("/dashboard")}
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#38bdf8",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <FireOutlined style={{ fontSize: "24px" }} />
          FitGo
        </div>

        {/* DESKTOP MENU */}
        <div className="desktop-menu" style={{ display: "flex", gap: "16px" }}>
          {isLoggedIn && (
            <>
              <Button
                type="text"
                style={{ color: "#e2e8f0" }}
                icon={<DashboardOutlined />}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>

              {/* Workout Dropdown */}
              <Dropdown menu={workoutMenu} placement="bottomRight">
                <Button type="text" style={{ color: "#e2e8f0" }}>
                  <BarChartOutlined /> Workout ▾
                </Button>
              </Dropdown>

              <Button
                type="text"
                style={{ color: "#e2e8f0" }}
                icon={<UserOutlined />}
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>

              <Button
                type="text"
                style={{ color: "#e2e8f0" }}
                icon={<RobotOutlined />}
                onClick={() => navigate("/ai")}
              >
                AI Coach
              </Button>

              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}

          {/* Public Routes */}
          {!isLoggedIn && (
            <>
              <Button
                type="text"
                style={{ color: "#e2e8f0" }}
                icon={<LoginOutlined />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                type="primary"
                icon={<FormOutlined />}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <div
          className="mobile-menu-button"
          style={{ display: "none" }}
        >
          <MenuOutlined
            onClick={() => setOpen(true)}
            style={{ fontSize: 26, color: "#e2e8f0" }}
          />
        </div>
      </Header>

      {/* MOBILE DRAWER MENU */}
      <Drawer
        title="FitGo Menu"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Menu
          mode="vertical"
          items={[
            ...(isLoggedIn
              ? [
                  {
                    key: "dash",
                    label: "Dashboard",
                    icon: <DashboardOutlined />,
                    onClick: () => navigate("/dashboard"),
                  },
                  {
                    key: "log",
                    label: "Log Workout",
                    icon: <BarChartOutlined />,
                    onClick: () => navigate("/workouts"),
                  },
                  {
                    key: "history",
                    label: "Workout History",
                    icon: <HistoryOutlined />,
                    onClick: () => navigate("/workouts/history"),
                  },
                  {
                    key: "profile",
                    label: "Profile",
                    icon: <UserOutlined />,
                    onClick: () => navigate("/profile"),
                  },
                  {
                    key: "ai",
                    label: "AI Coach",
                    icon: <RobotOutlined />,
                    onClick: () => navigate("/ai"),
                  },
                  {
                    key: "logout",
                    label: "Logout",
                    icon: <LogoutOutlined />,
                    danger: true,
                    onClick: handleLogout,
                  },
                ]
              : [
                  {
                    key: "login",
                    label: "Login",
                    icon: <LoginOutlined />,
                    onClick: () => navigate("/login"),
                  },
                  {
                    key: "register",
                    label: "Register",
                    icon: <FormOutlined />,
                    onClick: () => navigate("/register"),
                  },
                ]),
          ]}
        />
      </Drawer>

      {/* RESPONSIVE CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-menu {
              display: none !important;
            }
            .mobile-menu-button {
              display: block !important;
            }
          }
        `}
      </style>
    </>
  );
}
