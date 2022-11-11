const sequelize = require("sequelize");
const { db } = require("../config/db.config");

export const Response = db.define("response", {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  text: { type: sequelize.STRING, allowNull: false },
  user_id: { type: sequelize.INTEGER, allowNull: false },
  ticket_id: { type: sequelize.INTEGER, allowNull: false },
});