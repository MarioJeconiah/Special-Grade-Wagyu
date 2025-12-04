export default (sequelize, DataTypes) => {
  return sequelize.define("Element", {
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

    element_icon_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: "element_icon",
    timestamps: false
  });
};
