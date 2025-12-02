import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  if (username.trim() && password.trim()) {
    setUser({ username }); // SIMPAN SEBAGAI OBJEK
    navigate("/"); // kembali ke home
  }
};

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="sign-in-btn" onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </div>
  );
}
