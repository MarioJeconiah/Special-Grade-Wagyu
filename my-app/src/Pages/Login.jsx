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
import { useNavigate, NavLink } from "react-router-dom";

// Tentukan API Base URL
const API_URL = "http://localhost:4000/api/auth";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Tambah state untuk pesan error
  const [loading, setLoading] = useState(false); // Tambah state untuk loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // Gunakan async
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and Password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login berhasil (status 200)
        // data berisi: { id, username, token }
        
        // Simpan token di local storage
        localStorage.setItem("userToken", data.token);

        // Panggil setUser untuk menyimpan info user
        setUser({ id: data.id, username: data.username, token: data.token });

        navigate("/"); // kembali ke home
      } else {
        // Login gagal (status 400 atau 500)
        // Tampilkan pesan error dari backend
        setError(data.message || data.error || "Login failed. Check your credentials.");
      }
    } catch (err) {
      setError("Network error or server unreachable.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h2 className="login-title">Login</h2>
        
        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>} {/* Tampilkan error */}

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

        {/* ===== REGISTER BUTTON ===== */}
        <button
          className="sign-in-btn"   // CSS SAMA DENGAN SIGN IN
          style={{ marginTop: "10px", background: "#666" }} // sedikit beda agar terlihat tombol lain
          onClick={() => navigate("/register")}
        >
          Register
        </button>

      </div>
    </div>
  );
}