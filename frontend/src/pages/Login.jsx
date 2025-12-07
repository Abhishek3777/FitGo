import { useState } from "react";
import axios from "axios";
import { Card, Input, Button, Form, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Login() {
  const navigate  =useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      message.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      message.error("Login failed: " + err.message);
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
        padding: "20px"
      }}
    >
      <Card
        style={{
          width: 350,
          borderRadius: 10,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)"
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 25 }}>
          Login
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email">
            <Input
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
            style={{ marginTop: "10px" }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
