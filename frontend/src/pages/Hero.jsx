import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "60px 20px" }}>
      {/* Top section */}
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        
        <button
          style={{
            padding: "6px 14px",
            background: "#E6F7F7",
            border: "1px solid #C0EDED",
            borderRadius: "12px",
            color: "#008578",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          🔍 AI-Powered Fitness Monitoring
        </button>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: "900",
            margin: "0",
            color: "#0D0D0D",
            lineHeight: "1.1",
          }}
        >
          Train Smarter.
        </h1>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: "900",
            margin: "0 0 20px",
            color: "#008578",
            lineHeight: "1.1",
          }}
        >
          Perform Better.
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#4A4A4A",
            maxWidth: "600px",
            margin: "0 auto 30px",
          }}
        >
          Experience the future of fitness with real-time performance tracking,
          nutrition insights, and personalized recommendations powered by AI.
        </p>

        {/* CTA buttons */}
        <div style={{ marginTop: "25px", display: "flex", justifyContent: "center", gap: "15px" }}>
          
          <Button
            type="primary"
            size="large"
            style={{
              background: "#008578",
              borderColor: "#008578",
              padding: "0 24px",
              borderRadius: "8px",
              fontSize: "16px"
            }}
            onClick={() => navigate("/dashboard")}
          >
            Start Free Trial
          </Button>

          <Button
            size="large"
            style={{
              borderColor: "#008578",
              color: "#008578",
              padding: "0 24px",
              borderRadius: "8px",
              fontSize: "16px"
            }} onClick={() => navigate("/ai")}
          >
            AI Coach
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "80px",
          gap: "100px",
          flexWrap: "wrap",
        }}
      >
        {[
          { number: "50K+", label: "Active Users" },
          { number: "1M+", label: "Workouts Tracked" },
          { number: "98%", label: "Satisfaction Rate" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "40px", margin: 0, color: "#008578" }}>{stat.number}</h2>
            <p style={{ color: "#4A4A4A" }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
