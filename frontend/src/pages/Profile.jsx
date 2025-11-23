import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
    const [profile, setProfile] = useState({
        age: "",
        height: "",
        weight: "",
        gender: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await axios.get("http://localhost:8000/auth/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setProfile(res.data);
        }
        catch (err) {
            console.log(err.message);

        }
    };

    const updateProfile = async () => {
        try {
            await axios.put("http://localhost:8000/auth/profile", profile, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            alert("Updated!");
        }
        catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <h2>Profile</h2>

            <input
                value={profile.age || ""}
                placeholder="Age"
                onChange={(e) =>
                    setProfile({ ...profile, age: e.target.value })
                }
            />

            <input
                value={profile.height || ""}
                placeholder="Height"
                onChange={(e) =>
                    setProfile({ ...profile, height: e.target.value })
                }
            />

            <input
                value={profile.weight || ""}
                placeholder="Weight"
                onChange={(e) =>
                    setProfile({ ...profile, weight: e.target.value })
                }
            />

            <input
                value={profile.gender || ""}
                placeholder="Gender"
                onChange={(e) =>
                    setProfile({ ...profile, gender: e.target.value })
                }
            />

            <button onClick={updateProfile}>Save</button>
        </div>
    );
}
