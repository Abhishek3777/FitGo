import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Button, Typography, message } from "antd";

const { Title } = Typography;

export default function AddMeal({ reloadMeals }) {
  const [query, setQuery] = useState("");
  const [food, setFood] = useState(null);

  const search = async () => {
    try {
      console.log("TOKEN:", localStorage.getItem("token"));
      const res = await axios.get(`http://localhost:8000/meals?q=${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setFood(res.data);
    } catch {
      message.error("Food not found");
    }
  };

  const saveMeal = async () => {
    try {
      await axios.post("http://localhost:8000/meals", {
        name: food.name || query,
        quantity: query,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      message.success("Meal saved!");
      // ⭐ Refresh dashboard data
      if (reloadMeals) reloadMeals();


    } catch (err) {
      message.error("Error saving meal");
      console.log(err.message);

    }
  };

  return (
    <div style={{ padding: 40 }}>
      <Card style={{ maxWidth: 400, margin: "auto" }}>
        <Title level={3}>Add Meal</Title>

        <Input
          placeholder="E.g. 1 banana"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <Button type="primary" onClick={search}>Search</Button>

        {food && (
          <Card style={{ marginTop: 20 }}>
            <p><b>Calories:</b> {food.calories}</p>
            <p><b>Protein:</b> {food.protein} g</p>
            <p><b>Carbs:</b> {food.carbs} g</p>
            <p><b>Fat:</b> {food.fat} g</p>

            <Button type="primary" style={{ marginTop: 10 }} onClick={saveMeal}>
              Save Meal
            </Button>
          </Card>
        )}
      </Card>
    </div>
  );
}
