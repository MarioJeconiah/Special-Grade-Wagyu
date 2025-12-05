// import { useState } from "react";
// import { useNavigate, NavLink } from "react-router-dom";

// export default function Login({ setUser }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (username.trim() && password.trim()) {
//       setUser({ username }); // Simpan user sebagai object
//       navigate("/"); // kembali ke home
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">

//         <h2 className="login-title">Login</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           className="login-input"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="login-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="sign-in-btn" onClick={handleSubmit}>
//           Sign In
//         </button>

//         {/* ===== REGISTER BUTTON ===== */}
//         <button
//           className="sign-in-btn"   // CSS SAMA DENGAN SIGN IN
//           style={{ marginTop: "10px", background: "#666" }} // sedikit beda agar terlihat tombol lain
//           onClick={() => navigate("/register")}
//         >
//           Register
//         </button>

//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // pastikan path benar

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and Password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const data = response.data;

      // Simpan token dengan nama yang digunakan axios interceptor
      localStorage.setItem("token", data.token);

      // Simpan info user ke state global
      setUser({
        id: data.id,
        username: data.username,
        token: data.token,
      });

      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h2 className="login-title">Login</h2>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

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

        <button className="sign-in-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <button
          className="sign-in-btn"
          style={{ marginTop: "10px"}}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
