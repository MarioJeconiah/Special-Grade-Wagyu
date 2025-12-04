// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleRegister = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!username.trim() || !email.trim() || !password.trim()) {
//       setError("All fields are required.");
//       return;
//     }

//     const newUser = { username, email, password };
//     localStorage.setItem("registeredUser", JSON.stringify(newUser));

//     alert("Registration successful! Please login.");
//     navigate("/login");
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">
//         <h2 className="login-title">Register</h2>

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <input
//           type="text"
//           placeholder="Username"
//           className="login-input"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="login-input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="login-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="sign-in-btn" onClick={handleRegister}>
//           Register
//         </button>

//         {/* Tombol kembali ke login */}
//         <button
//           className="sign-in-btn"
//           style={{ marginTop: "12px", backgroundColor: "#6c6c6c" }}
//           onClick={() => navigate("/login")}
//         >
//           Back to Login
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Tentukan API Base URL
const API_URL = "http://localhost:4000/api/auth";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Tambah state untuk loading

  const handleRegister = async (e) => { // Gunakan async
    e.preventDefault();
    setError("");

    // Validasi dasar
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Kirim hanya username dan password, karena backend authControllers.js hanya memproses ini
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Pendaftaran berhasil (status 201)
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        // Pendaftaran gagal (misalnya username sudah ada, atau error 500)
        // Tampilkan pesan error dari backend
        setError(data.error || data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error or server unreachable.");
      console.error("Register Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Register</h2>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="sign-in-btn" onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Tombol kembali ke login */}
        <button
          className="sign-in-btn"
          style={{ marginTop: "12px", backgroundColor: "#6c6c6c" }}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}