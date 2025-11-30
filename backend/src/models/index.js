import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

import userModel from "./user.js";
import weaponModel from "./weapon.js";
import characterModel from "./character.js";
import postModel from "./post.js";
import commentModel from "./comment.js";

export const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
    dialect: "postgres",
    logging: false
  }
);

// initialize
export const User = userModel(sequelize, DataTypes);
export const Weapon = weaponModel(sequelize, DataTypes);
export const Character = characterModel(sequelize, DataTypes);
export const Post = postModel(sequelize, DataTypes);
export const Comment = commentModel(sequelize, DataTypes);

// relations
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// optional many-to-many Character <-> Weapon
Character.belongsToMany(Weapon, { through: "CharacterWeapons" });
Weapon.belongsToMany(Character, { through: "CharacterWeapons" });

export default {
  sequelize,
  User,
  Weapon,
  Character,
  Post,
  Comment
};
