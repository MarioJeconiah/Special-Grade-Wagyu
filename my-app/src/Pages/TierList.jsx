import React, { useState } from "react";

const ALL_CHARACTERS = [
  { name: "Furina", url: "https://sunderarmor.com/GENSHIN/Characters/1/Furina.png" },
  { name: "Kazuha", url: "https://sunderarmor.com/GENSHIN/Characters/1/Kazuha.png" },
  { name: "Neuvillette", url: "https://sunderarmor.com/GENSHIN/Characters/1/Neuvillette.png" },
  { name: "Arlecchino", url: "https://sunderarmor.com/GENSHIN/Characters/1/Arlecchino.png" },
  { name: "RaidenShogun", url: "https://sunderarmor.com/GENSHIN/Characters/1/Raiden.png" },
  { name: "Yelan", url: "https://sunderarmor.com/GENSHIN/Characters/1/Yelan.png" },
  { name: "Zhongli", url: "https://sunderarmor.com/GENSHIN/Characters/1/Zhongli.png" },
  { name: "HuTao", url: "https://sunderarmor.com/GENSHIN/Characters/1/Hu%20Tao.png" },
  { name: "Ganyu", url: "https://sunderarmor.com/GENSHIN/Characters/1/Ganyu.png" },
  { name: "Alhaitham", url: "https://sunderarmor.com/GENSHIN/Characters/1/Alhaitham.png" },
  { name: "Wanderer", url: "https://sunderarmor.com/GENSHIN/Characters/1/Wanderer.png" },
  { name: "Chiori", url: "https://sunderarmor.com/GENSHIN/Characters/1/Chiori.png" },
  { name: "Xianyun", url: "https://sunderarmor.com/GENSHIN/Characters/1/Xianyun.png" },
  { name: "Mona", url: "https://sunderarmor.com/GENSHIN/Characters/1/Mona.png" },
  { name: "Diluc", url: "https://sunderarmor.com/GENSHIN/Characters/1/Diluc.png" },
  { name: "Jean", url: "https://sunderarmor.com/GENSHIN/Characters/1/Jean.png" },
  { name: "Venti", url: "https://sunderarmor.com/GENSHIN/Characters/1/Venti.png" },
];


const buttonStyle = {
  backgroundColor: "#1a1a1a",
  color: "white",
  border: "2px solid #555",
  padding: "10px 25px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px",
  transition: "0.3s",
};

// --- STATIC TIER LIST ---
function StaticTierList({ showInteractive, setShowInteractive }) {
  const tierData = {
    S: [
      ALL_CHARACTERS.find(c => c.name === "Furina").url,
      ALL_CHARACTERS.find(c => c.name === "Kazuha").url,
    ],
    A: [ALL_CHARACTERS.find(c => c.name === "Arlecchino").url],
    B: [ALL_CHARACTERS.find(c => c.name === "Chiori").url],
    C: [ALL_CHARACTERS.find(c => c.name === "Xianyun").url],
    D: [ALL_CHARACTERS.find(c => c.name === "Diluc").url],
  };

  const tiers = Object.keys(tierData);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white",
      padding: "50px 0",
      fontFamily: "sans-serif",
    }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', paddingTop:'2rem' }}>
        <button
          onClick={() => setShowInteractive(!showInteractive)}
          style={buttonStyle}
        >
          {showInteractive ? 'Hide My Tier List' : 'Make Your Own Tier List'}
        </button>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        maxWidth: "800px",
      }}>
        {tiers.map(tier => (
          <div key={tier} style={{
            display: "flex",
            alignItems: "stretch",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "rgba(0,0,0,0.5)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          }}>
            <div style={{
              width: "120px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.15)",
              fontWeight: "bold",
              fontSize: "1.5rem",
              padding: '5px',
            }}>
              {tier}
            </div>

            <div style={{
              flex: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              padding: "10px",
              alignItems: "flex-start",
              minHeight: "120px",
            }}>
              {tierData[tier].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${tier} tier`}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- INTERACTIVE TIER LIST ---
function InteractiveTierList() {
  const [tierData, setTierData] = useState({ S: [], A: [], B: [], C: [], D: [] });
  const [showGallery, setShowGallery] = useState(false);
  const [targetTier, setTargetTier] = useState(null);

  const tiers = Object.keys(tierData);

  const handleAddClick = (tier) => {
    setTargetTier(tier);
    setShowGallery(true);
  };

  const addCharacterToTier = (url) => {
    if (targetTier) {
      setTierData(prev => ({ ...prev, [targetTier]: [...prev[targetTier], url] }));
      setShowGallery(false);
    }
  };

  const removeCharacter = (tier, url, i) => {
    setTierData(prev => ({
      ...prev,
      [tier]: prev[tier].filter((u, idx) => !(u === url && idx === i)),
    }));
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white",
      padding: "50px 0",
      fontFamily: "sans-serif",
    }}>
      {showGallery && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(5px)",
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "20px", zIndex: 20
        }}>
          <button onClick={() => setShowGallery(false)} style={{
            position: "absolute", top: "20px", right: "25px",
            padding: "8px 14px", backgroundColor: "#ff4d4d",
            color: "white", border: "none", borderRadius: "8px",
            fontSize: "1.2rem", cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>✕</button>

          <div style={{
            display: "flex", flexWrap: "wrap", gap: "10px",
            padding: "10px", maxWidth: "900px", maxHeight: "80%",
            overflowY: "auto", borderRadius: "10px", marginTop: "60px"
          }}>
            {ALL_CHARACTERS.map(c => (
              <div key={c.name} onClick={() => addCharacterToTier(c.url)} style={{
                width: "100px", height: "100px", borderRadius: "10px",
                overflow: "hidden", cursor: "pointer",
                border: "3px solid transparent", transition: "transform 0.2s"
              }}>
                <img src={c.url} alt={c.name} style={{
                  width: "100%", height: "100%", objectFit: "cover"
                }}/>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        maxWidth: "800px",
      }}>
        {tiers.map(tier => (
          <div key={tier} style={{
            display: "flex",
            alignItems: "stretch",
            border: "2px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "rgba(0,0,0,0.5)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          }}>
            <div style={{
              width: "120px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.15)",
              fontWeight: "bold",
              fontSize: "1.5rem",
              padding: '5px',
            }}>
              {tier}
              <button
                onClick={() => handleAddClick(tier)}
                style={{
                  ...buttonStyle,
                  padding: "8px 20px",
                  fontSize: "14px",
                  marginTop: "8px",
                }}
              >
                Add
              </button>
            </div>

            <div style={{
              flex: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              padding: "10px",
              alignItems: "flex-start",
              minHeight: "120px",
            }}>
              {tierData[tier].length > 0 ? (
                tierData[tier].map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() => removeCharacter(tier, img, index)}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      transition: "transform 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                ))
              ) : (
                <span style={{ color: 'rgba(255,255,255,0.5)', margin: 'auto' }}>
                  Click “Add” to populate this tier.
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
function TierListApp() {
  const [showInteractive, setShowInteractive] = useState(false);
  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'sans-serif',
    }}>
      <StaticTierList
        showInteractive={showInteractive}
        setShowInteractive={setShowInteractive}
      />
      {showInteractive && <InteractiveTierList />}
    </div>
  );
}

export default TierListApp;
