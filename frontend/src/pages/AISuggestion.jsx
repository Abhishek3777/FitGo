import { useState } from "react";
import axios from "axios";
import { Card, Button, Typography, message, Spin } from "antd";

const { Title, Paragraph } = Typography;

export default function AICoach() {
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");

    const generateAIAdvice = async () => {
        setLoading(true);
        setSummary("");

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/summary`);

            const text = res.data?.summary || "No summary available.";
            setSummary(text);
            console.log(text);

            message.success("AI Summary Generated!");

        } catch (err) {
            console.error(err);
            message.error("Failed to generate summary");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "30px",
                background: "#f5f6fa",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Card
                style={{
                    width: "800px",
                    padding: "25px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
            >
                <Title level={2} style={{ textAlign: "center" }}>
                    FitGo AI Coach
                </Title>

                <Paragraph style={{ textAlign: "center", marginBottom: 25 }}>
                    Get personalized fitness advice based on your meals, workouts, and profile.
                </Paragraph>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        type="primary"
                        size="large"
                        onClick={generateAIAdvice}
                        disabled={loading}
                        style={{ width: "220px" }}
                    >
                        {loading ? <Spin /> : "Generate Summary"}
                    </Button>
                </div>

                {summary && (
                    <Card
                        style={{
                            marginTop: "30px",
                            background: "#e8f4ff",
                            borderRadius: "12px",
                        }}
                    >
                        <Title level={4}>Your AI Summary</Title>
                        <Paragraph style={{ fontSize: "16px", whiteSpace: "pre-line" }}>
                            {summary}
                        </Paragraph>
                    </Card>
                )}
            </Card>
        </div>
    );
}
