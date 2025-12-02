import React from "react";

function Weapon() {
  const weapons = [
    {
      name: "Wolf's Gravestone",
      type: "Claymore",
      image: "https://sunderarmor.com/GENSHIN/Weapons/Wolf's_Gravestone.png",
      description:
        "Increases ATK by 20%. On hit, attacks against enemies with less than 30% HP increase all party members' ATK by 40% for 12s.",
    },
    {
      name: "Aqua Simulacra",
      type: "Bow",
      image: "https://sunderarmor.com/GENSHIN/Weapons/Aqua_Simulacra.png",
      description:
        "HP increased by 16%. When nearby enemies exist, the wielder’s damage is increased by 20%.",
    },
    {
      name: "Primordial Jade Winged-Spear",
      type: "Polearm",
      image: "https://sunderarmor.com/GENSHIN/Weapons/Primordial_Jade_Winged-Spear.png",
      description:
        "On hit, increases ATK by 3.2% for 6s. Max 7 stacks. Increases damage dealt by 12% when max stacks are reached.",
    },
    {
      name: "Mistsplitter Reforged",
      type: "Sword",
      image: "https://sunderarmor.com/GENSHIN/Weapons/Mistsplitter_Reforged.png",
      description:
        "Grants a 12% Elemental DMG Bonus for all elements and stacks Mistsplitter’s Emblem to boost Elemental DMG further.",
    },
    {
      name: "Skyward Harp",
      type: "Bow",
      image: "https://sunderarmor.com/GENSHIN/Weapons/Skyward_Harp.png",
      description:
        "Increases CRIT DMG by 20%. Hits have a 60% chance to inflict a small AoE attack dealing 125% Physical ATK DMG.",
    },
    {
      name: "The Unforged",
      type: "Claymore",
      image: "https://sunderarmor.com/GENSHIN/Weapons/The_Unforged.png",
      description:
        "Increases shield strength by 20%. On hit, boosts ATK by 4% for 8s; doubles effect while protected by a shield.",
    },
    {
      name: "Lost Prayer to the Sacred Winds",
      type: "Catalyst",
      image: "https://sunderarmor.com/GENSHIN/Weapons/Lost_Prayer_to_the_Sacred_Winds.png",
      description:
        "Increases Movement SPD by 10%. Gains an 8% Elemental DMG Bonus every 4s while in battle. Max 4 stacks.",
    },
    {
      name: "Staff of Homa",
      type: "Polearm",
      image: "https://sunderarmor.com/GENSHIN/Weapons/Staff_of_Homa.png",
      description:
        "Increases HP by 20%. Provides ATK Bonus based on 0.8% of the wielder’s Max HP. Boosts CRIT DMG significantly.",
    },
    {
      name: "Amos' Bow",
      type: "Bow",
      image: "https://sunderarmor.com/GENSHIN/Weapons/Amos'_Bow.png",
      description:
        "Increases Normal and Charged Attack DMG by 12%. DMG increases by 8% for every 0.1s arrow is in flight.",
    },
    {
      name: "Freedom-Sworn",
      type: "Sword",
      image: "https://sunderarmor.com/GENSHIN/Weapons/Freedom-Sworn.png",
      description:
        "Increases DMG by 10%. Triggering Elemental Reactions grants a Sigil of Rebellion, boosting party ATK and DMG.",
    },
  ];

  return (
    <main className="content-container">
      <div className="content-box" style={{ marginTop: "6rem" }}>
        <h1>Genshin Impact Weapons</h1>
        <p>
          Weapons in <strong>Genshin Impact</strong> define a character’s fighting style.
          Each has unique passive abilities and ascension materials. Here’s a look at some
          of the most iconic weapons across Teyvat.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {weapons.map((w) => (
            <div
              key={w.name}
              className="weapon-card"
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                borderRadius: "10px",
                padding: "1rem",
                width: "250px",
                textAlign: "center",
                color: "white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={w.image}
                alt={w.name}
                className="weapon-img"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  transition: "transform 0.3s ease",
                }}
              />
              <h3>{w.name}</h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>
                {w.type}
              </p>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                {w.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .weapon-card:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            border: 1px solid rgba(255,255,255,0.5);
          }

          .weapon-card:hover .weapon-img {
            transform: scale(1.1);
          }
        `}
      </style>
    </main>
  );
}

export default Weapon;
