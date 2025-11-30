export default (sequelize, DataTypes) => {
  return sequelize.define("Character", {
    name: DataTypes.STRING,
    role: DataTypes.STRING,
  });
};
