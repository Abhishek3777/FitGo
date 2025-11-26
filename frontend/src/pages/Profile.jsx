import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input, Button, Form, Typography, message } from "antd";

const { Title } = Typography;

export default function Profile() {
  const [profile, setProfile] = useState({
    age: "",
    height: "",
    weight: "",
    gender: ""
  });

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8000/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res.data || {};
      setProfile({
        age: data.age || "",
        height: data.height || "",
        weight: data.weight || "",
        gender: data.gender || "",
      });
    } catch (err) {
      message.error("Failed to load profile");
      console.log(err.message);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put("http://localhost:8000/auth/profile", profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      message.success("Profile updated!");
    } catch (err) {
      message.error("Update failed");
      console.log(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: 10,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)"
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 25 }}>
          Your Profile
        </Title>

        <Form layout="vertical" onFinish={updateProfile}>
          <Form.Item label="Age">
            <Input
              placeholder="Age"
              value={profile.age || ""}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            />
          </Form.Item>

          <Form.Item label="Height (cm)">
            <Input
              placeholder="Height"
              value={profile.height}
              onChange={(e) =>
                setProfile({ ...profile, height: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Weight (kg)">
            <Input
              placeholder="Weight"
              value={profile.weight}
              onChange={(e) =>
                setProfile({ ...profile, weight: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Gender">
            <Input
              placeholder="Gender"
              value={profile.gender}
              onChange={(e) =>
                setProfile({ ...profile, gender: e.target.value })
              }
            />
          </Form.Item>

          <Button
            type="primary"
            block
            size="large"
            htmlType="submit"
            style={{ marginTop: 10 }}
          >
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
}
