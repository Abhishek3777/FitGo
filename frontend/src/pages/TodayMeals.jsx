// frontend/src/pages/TodayMeals.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, List, Typography, Spin, Empty } from "antd";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const { Title } = Typography;

export default function TodayMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMeals = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/today`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMeals(res.data || []);
    } catch (err) {
      console.error("LOAD MEALS ERROR:", err);
      setError(
        err.response?.data?.msg || err.message || "Failed to load meals"
      );
    } finally {
      setLoading(false);
    }
  };

  // totals
  const totalCalories = Math.round(
    meals.reduce((s, m) => s + (m.calories || 0), 0)
  );

  const totalProtein = meals.reduce((sum, m) => sum + (m.protein || 0), 0);
  const totalCarbs = meals.reduce((sum, m) => sum + (m.carbs || 0), 0);
  const totalFat = meals.reduce((sum, m) => sum + (m.fat || 0), 0);

  // Bar chart: calories per meal (label = quantity or name)
  const caloriesData = {
    labels: meals.map((m, idx) => m.quantity || m.name || `Item ${idx + 1}`),
    datasets: [
      {
        label: "Calories",
        data: meals.map((m) => m.calories || 0),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  const caloriesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Pie chart: macros breakdown
  const macroPieData = {
    labels: ["Protein (g)", "Carbs (g)", "Fat (g)"],
    datasets: [
      {
        data: [totalProtein, totalCarbs, totalFat],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Today's Meals</Title>

      {loading ? (
        <Card style={{ textAlign: "center", padding: 40 }}>
          <Spin size="large" />
        </Card>
      ) : error ? (
        <Card style={{ marginBottom: 20 }}>
          <div style={{ color: "red" }}>{error}</div>
        </Card>
      ) : meals.length === 0 ? (
        <Card style={{ marginBottom: 20 }}>
          <Empty description="No meals logged for today" />
        </Card>
      ) : (
        <>
          <Card style={{ marginBottom: 20 }}>
            <b>Total Calories: {Math.round(totalCalories * 10) / 10}</b>
            <div style={{ marginTop: 8 }}>
              Protein: {Math.round(totalProtein * 10) / 10} g • Carbs:{" "}
              {Math.round(totalCarbs * 10) / 10} g • Fat:{" "}
              {Math.round(totalFat * 10) / 10} g
            </div>
          </Card>

          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr", marginBottom: 20 }}>
            {/* Bar chart card */}
            <Card style={{ padding: 16, height: 320 }}>
              <Title level={4}>Calories per Meal</Title>
              <div style={{ height: 240 }}>
                <Bar data={caloriesData} options={caloriesOptions} />
              </div>
            </Card>

            {/* Pie chart card */}
            <Card style={{ padding: 16 }}>
              <Title level={4}>Macros Breakdown (g)</Title>
              <div style={{ maxWidth: 420, margin: "0 auto" }}>
                <Pie data={macroPieData} />
              </div>
            </Card>
          </div>

          <ListMeals meals={meals} />
        </>
      )}
    </div>
  );
}

// small subcomponent for list rendering
function ListMeals({ meals }) {
  return (
    <>
      <Title level={4}>Meal Log</Title>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {meals.map((m) => (
          <Card key={m._id} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <b>{m.quantity || m.name}</b>
                <div style={{ color: "#666" }}>{new Date(m.date).toLocaleString()}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div>Calories: {m.calories ?? 0}</div>
                <div>Protein: {m.protein ?? 0} g</div>
                <div>Carbs: {m.carbs ?? 0} g</div>
                <div>Fat: {m.fat ?? 0} g</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
