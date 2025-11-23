import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post("http://localhost:8000/auth/register", form);
            alert("Registered User");
        }
        catch (err) {
            setError(err.message);
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}


                <input type="text" name='name' placeholder='name' onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input type="email" name='email' placeholder='email'
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" name='password' placeholder='password'
                    onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

        </div>
    )
}

export default Register
