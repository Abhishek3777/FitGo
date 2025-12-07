import { useState } from "react";
import axios from "axios";
import { Card, Input, Button, Form, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, form);
      message.success("User registered successfully!");
      navigate("/login");
    } catch (err) {
      message.error("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: 10,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 25 }}>
          Create Account
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name">
            <Input
              placeholder="Enter your name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Email">
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              placeholder="Enter your password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            style={{ marginTop: "10px" }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
