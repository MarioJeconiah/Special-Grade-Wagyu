import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000"; // ubah jika perlu

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/register`, {
        username,
        email,
        password,
      });
      // backend mengirim { message, user }
      alert(res.data?.message || "Register sukses");
      navigate("/login");
    } catch (err) {
      // server returns { error: "..." }
      setError(err.response?.data?.error || "Terjadi kesalahan saat register");
    }
  };

  return (
    <div className="login-container" style={{ padding: 20 }}>
      <h2>Register</h2>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}
