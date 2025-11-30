import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import Character from "./Pages/Character";
import Weapon from "./Pages/Weapon";
import TierList from "./Pages/TierList";
import Login from "./Pages/Login";
import Forum from "./Pages/Forum";
import "./App.css";

function AppContent() {
  const [user, setUser] = useState(null);

  const [comments, setComments] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const location = useLocation();

  // Jika user membuka /forum tanpa login → muncul popup
  useEffect(() => {
    if (location.pathname === "/forum" && !user) {
      setShowLoginPopup(true);
    } else {
      setShowLoginPopup(false);
    }
  }, [location, user]);

  return (
    <div>
      {/* === POPUP LOGIN REQUIRED === */}
      {showLoginPopup && (
        <div className="forum-popup-overlay">
          <div className="forum-popup-box">
            <h2>Community Discussion</h2>
            <p>You must Login to join the discussion</p>

            <NavLink to="/login" className="forum-popup-btn">
              Go to Login
            </NavLink>

            <button
              className="forum-popup-close"
              onClick={() => setShowLoginPopup(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* === NAVBAR === */}
      <nav className="navbar">
        <ul className="nav-left">
          <li>
            <NavLink to="/" className="nav-itemLeft">
              HOME
            </NavLink>
          </li>
        </ul>

        <ul className="nav-right">
          <li>
            <NavLink to="/character" className="nav-item">
              CHARACTER
            </NavLink>
          </li>
          <li>
            <NavLink to="/weapon" className="nav-item">
              WEAPON
            </NavLink>
          </li>
          <li>
            <NavLink to="/tierlist" className="nav-item">
              TIER LIST
            </NavLink>
          </li>

          {!user ? (
            <NavLink to="/login" className="login-btn">LOGIN</NavLink>
          ) : (
            <span className="login-btn">{user.username}</span>
          )}
        </ul>
      </nav>

      {/* === ROUTES === */}
      <Routes>
        <Route
          path="/"
          element={
            <main className="content-container">
              <div className="content-box" style={{ marginTop: "4rem" }}>
                <img src="/GenshinImpactLogo.png" alt="Logo" className="content-logo" />
                <h1>Genshin Impact</h1>
                <p>
                  Welcome to the Genshin Impact Wiki — a comprehensive fan-made
                  database dedicated to miHoYo's open-world action RPG.
                </p>
              </div>

              <section className="content-box forum-section">
                <NavLink to="/forum" className="tierlist-btn">
                  Join Community Discussion
                </NavLink>
              </section>
            </main>
          }
        />

        <Route path="/character" element={<Character />} />
        <Route path="/weapon" element={<Weapon />} />
        <Route path="/tierlist" element={<TierList />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Forum akan tetap dirender, tapi diblokir oleh popup */}
        <Route
          path="/forum"
          element={
            <Forum
              user={user}
              comments={comments}
              setComments={setComments}
            />
          }
        />
      </Routes>

      {/* === FOOTER === */}
      <footer className="solid-section">
        <p>
          Welcome to the Genshin Impact Wiki Fandom! Explore characters,
          stories, and guides from Genshin Impact.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
