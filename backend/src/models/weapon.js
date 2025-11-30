export default (sequelize, DataTypes) => {
  return sequelize.define("Weapon", {
    name: { type: DataTypes.STRING, allowNull: false },
    damage: { type: DataTypes.INTEGER, allowNull: true },
    rarity: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: true }
  });
};
