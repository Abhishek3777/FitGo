import React from "react";
import { Menu, Layout, Button } from "antd";
import { LogoutOutlined, UserOutlined, DashboardOutlined, FireOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;


export default function Navbar() {
const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <Header
            style={{
                height: "62px",
                lineHeight: "72px",
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
            {/* Left Logo */}
            <div onClick={() => navigate("/dashboard")}
                style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#38bdf8",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    letterSpacing: "1px",
                }}
            >
                <FireOutlined style={{ fontSize: "24px", color: "#38bdf8" }} />
                FitGo
            </div>

            {/* Center Menu */}
            <Menu
                mode="horizontal"
                  selectedKeys={[]}
                theme="dark"
                defaultSelectedKeys={["dashboard"]}
                onClick={() => navigate("/dashboard")}
                style={{
                    background: "transparent",
                    flexGrow: 1,
                    justifyContent: "center",
                    borderBottom: "none",
                }}
                items={[
                    {
                        key: "dashboard",
                        label: (
                            <span style={{ color: "#e2e8f0", fontSize: "16px" }}>
                                <DashboardOutlined style={{ marginRight: 6 }} />
                                Calories/Food
                            </span>
                        ),
                    },
                    
                ]}
            />

            {/* Right Side Buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
                <Button
                    type="text"
                    href="/workouts"
                    style={{
                        color: "#e2e8f0",
                        fontSize: "15px",
                    }}
                    icon={<UserOutlined />}
                >
                    Workout
                </Button>
                <Button
                    type="text"
                    href="/profile"
                    style={{
                        color: "#e2e8f0",
                        fontSize: "15px",
                    }}
                    icon={<UserOutlined />}
                >
                    Profile
                </Button>

                <Button
                    type="primary"
                    danger
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </Header>
    );
}
