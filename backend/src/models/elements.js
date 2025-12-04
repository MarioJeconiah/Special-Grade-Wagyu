module.exports = (sequelize, DataTypes) => {
  const Element = sequelize.define("Element", {
    element_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },

    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "elements",
    timestamps: false
  });

  return Element;
};
