export default (sequelize, DataTypes) => {
  return sequelize.define("Character", {
    char_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING(50), allowNull: false },
    element: { type: DataTypes.STRING(30), allowNull: false },
    weapon: { type: DataTypes.STRING(30), allowNull: false },
    rarity: { type: DataTypes.INTEGER, allowNull: false },
    role: { type: DataTypes.STRING(30) },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.TEXT }
  }, {
    tableName: 'character_list',
    timestamps: false
  });
};