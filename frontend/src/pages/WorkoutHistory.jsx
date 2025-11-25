import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Tag, List, Spin, Empty } from "antd";

const { Title } = Typography;

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/workouts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setWorkouts(res.data || []);
    } catch (err) {
      console.error("Error fetching workouts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        Workout History
      </Title>

      {workouts.length === 0 ? (
        <Card>
          <Empty description="No workouts logged yet" />
        </Card>
      ) : (
        workouts.map((w) => (
          <Card
            key={w._id}
            style={{
              marginBottom: 20,
              borderRadius: 10,
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title level={4} style={{ margin: 0 }}>
                {w.exercise}
              </Title>

              {/* PR Badge */}
              {w.isPR && (
                <Tag color="volcano" style={{ fontSize: 14, padding: "4px 10px" }}>
                  🔥 New PR
                </Tag>
              )}
            </div>

            <div style={{ marginTop: 10, marginBottom: 15, color: "#555" }}>
              <div>
                <b>Max Weight:</b> {w.maxWeight} kg
              </div>
              <div>
                <b>Volume:</b> {w.volume} kg
              </div>
              <div>
                <b>Estimated 1RM:</b> {Math.round(w.estimated1RM)} kg
              </div>
            </div>

            <List
              size="small"
              header={<b>Sets</b>}
              bordered
              dataSource={w.sets}
              style={{ marginBottom: 15, borderRadius: 6 }}
              renderItem={(s, i) => (
                <List.Item>
                  <span>
                    Set {i + 1}: <b>{s.reps}</b> reps × <b>{s.weight}</b> kg
                  </span>
                </List.Item>
              )}
            />

            <div style={{ fontSize: 12, color: "#888" }}>
              {new Date(w.date).toLocaleString()}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
