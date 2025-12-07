import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Typography, List, Spin, Empty, message } from "antd";
import AddMeal from "./AddMeal";
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

export default function Dashboard() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load meals on mount
    useEffect(() => {
        loadMeals();
    }, []);

    const loadMeals = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setMeals(res.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load meals");
        } finally {
            setLoading(false);
        }
    };

    // TOTALS
    const totalCalories = Math.round(meals.reduce((s, m) => s + (m.calories || 0), 0));
    const totalProtein = Math.round(meals.reduce((s, m) => s + (m.protein || 0), 0));
    const totalCarbs = Math.round(meals.reduce((s, m) => s + (m.carbs || 0), 0));
    const totalFat = Math.round(meals.reduce((s, m) => s + (m.fat || 0), 0));

    // CHART DATA
    const caloriesChartData = {
        labels: meals.map((m) => m.quantity || m.name),
        datasets: [
            {
                label: "Calories",
                data: meals.map((m) => m.calories),
                backgroundColor: "rgba(54,162,235,0.7)",
            },
        ],
    };

    const caloriesOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
    };

    const macrosChartData = {
        labels: ["Protein", "Carbs", "Fat"],
        datasets: [
            {
                data: [totalProtein, totalCarbs, totalFat],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
        ],
    };

    return (
        <div style={{ padding: "20px" }}>

            {/* ADD MEAL SECTION */}
            <Card style={{ marginBottom: 20, borderRadius: 10 }}>
                <AddMeal reloadMeals={loadMeals} />
            </Card>

            {/* SUMMARY CARDS */}
            <Row gutter={16}>
                <Col span={8}>
                    <Card style={{ background: "#e0f2fe", borderRadius: 10 }}>
                        <Title level={4}>Total Calories</Title>
                        <Title level={2} style={{ color: "#0284c7" }}>
                            {totalCalories}
                        </Title>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card style={{ background: "#dcfce7", borderRadius: 10 }}>
                        <Title level={4}>Macros</Title>
                        <p>Protein: {totalProtein}g</p>
                        <p>Carbs: {totalCarbs}g</p>
                        <p>Fat: {totalFat}g</p>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card style={{ background: "#fef9c3", borderRadius: 10 }}>
                        <Title level={4}>Meals Logged</Title>
                        <Title level={2} style={{ color: "#ca8a04" }}>
                            {meals.length}
                        </Title>
                    </Card>
                </Col>
            </Row>

            {/* CHARTS */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={16}>
                    <Card style={{ height: 350, borderRadius: 10 }}>
                        <Title level={4}>Calories Per Meal</Title>
                        <div style={{ height: 260 }}>
                            <Bar data={caloriesChartData} options={caloriesOptions} />
                        </div>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card style={{ height: 350, borderRadius: 10 }}>
                        <Title level={4}>Macros Breakdown</Title>
                        <Pie data={macrosChartData} />
                    </Card>
                </Col>
            </Row>

            {/* MEAL LOG */}
            <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                    <Card title="Meal Log" style={{ borderRadius: 10 }}>
                        <div style={{ maxHeight: 300, overflowY: "auto" }}>
                            {loading ? (
                                <Spin />
                            ) : error ? (
                                <Empty description="Error loading meals" />
                            ) : meals.length === 0 ? (
                                <Empty description="No meals today" />
                            ) : (
                                <List
                                    dataSource={meals}
                                    renderItem={(m) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={`${m.name} - ${m.calories} kcal`}
                                                description={
                                                    <>
                                                        Protein: {m.protein}g • Carbs: {m.carbs}g • Fat: {m.fat}g
                                                    </>
                                                }
                                            />
                                        </List.Item>
                                    )}
                                />
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
