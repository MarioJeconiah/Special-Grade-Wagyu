import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import userModel from "./user.js";
import characterModel from "./character.js";
import weaponModel from "./weapon.js";
import postModel from "./post.js";
import commentModel from "./comment.js";
import elementModel from "./elements.js";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: "postgres",
    logging: false
  }
);

export const User = userModel(sequelize, DataTypes);
export const Character = characterModel(sequelize, DataTypes);
export const Weapon = weaponModel(sequelize, DataTypes);
export const Post = postModel(sequelize, DataTypes);
export const Comment = commentModel(sequelize, DataTypes);
export const Element = elementModel(sequelize, DataTypes);

// Relasi
// Note: Sequelize akan otomatis menambahkan kolom user_id ke Post jika belum ada
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE' // Pilihan: Jika Post dihapus, semua Comment ikut terhapus
});

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Element.hasMany(Character, {
  foreignKey: "element_id"
});

Character.belongsTo(Element, {
  foreignKey: "element_id"
});

export default { sequelize, User, Character, Weapon, Post, Comment, Element};