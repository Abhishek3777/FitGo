import { useState } from "react";
import axios from "axios";
import { Card, Button, Input, Row, Col, Typography, message } from "antd";

const { Title } = Typography;

export default function WorkoutLogger() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState([{ reps: "", weight: "" }]);
  const [loading, setLoading] = useState(false);

  // Add a new empty set
  const addSet = () => {
    setSets([...sets, { reps: "", weight: "" }]);
  };

  // Update reps and weight for each set
  const updateSet = (index, key, value) => {
    const newSets = [...sets];
    newSets[index][key] = value;
    setSets(newSets);
  };

  // Delete a set
  const removeSet = (index) => {
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);
  };

  // Submit workout
  const saveWorkout = async () => {
    if (!exercise.trim()) {
      message.error("Please enter an exercise name");
      return;
    }

    const cleanedSets = sets
      .map((s) => ({
        reps: Number(s.reps),
        weight: Number(s.weight),
      }))
      .filter((s) => s.reps > 0 && s.weight > 0);

    if (cleanedSets.length === 0) {
      message.error("Add at least one valid set");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/workouts",
        {
          exercise,
          sets: cleanedSets,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.msg.includes("PR")) {
        message.success(res.data.msg, 4);
      } else {
        message.success("Workout Logged!", 2);
      }

      // Clear form
      setExercise("");
      setSets([{ reps: "", weight: "" }]);

    } catch (err) {
      console.error(err.message);
      message.error("Error saving workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 650, margin: "auto" }}>
      <Card style={{ borderRadius: 10, padding: 20 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Log Workout
        </Title>

        {/* Exercise */}
        <Input
          placeholder="Exercise name (e.g., Bench Press)"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          style={{ marginBottom: 20 }}
        />

        {/* Sets */}
        {sets.map((set, index) => (
          <Card
            key={index}
            size="small"
            style={{
              marginBottom: 10,
              borderLeft: "4px solid #38bdf8",
              borderRadius: 6,
            }}
          >
            <Row gutter={10}>
              <Col span={10}>
                <Input
                  type="number"
                  placeholder="Reps"
                  value={set.reps}
                  onChange={(e) => updateSet(index, "reps", e.target.value)}
                />
              </Col>
              <Col span={10}>
                <Input
                  type="number"
                  placeholder="Weight (kg)"
                  value={set.weight}
                  onChange={(e) => updateSet(index, "weight", e.target.value)}
                />
              </Col>
              <Col span={4}>
                {sets.length > 1 && (
                  <Button
                    danger
                    onClick={() => removeSet(index)}
                    style={{ width: "100%" }}
                  >
                    X
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        ))}

        <Button onClick={addSet} block style={{ marginBottom: 20 }}>
          + Add Set
        </Button>

        <Button
          type="primary"
          block
          loading={loading}
          onClick={saveWorkout}
          style={{ fontSize: 16, height: 45 }}
        >
          Save Workout
        </Button>
      </Card>
    </div>
  );
}
