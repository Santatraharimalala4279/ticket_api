require("dotenv").config();
let Sequelize = require("sequelize");
const env = process.env;
let db = new Sequelize(env.DB_DATABASE, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: "mysql",
  logging: false, //passer a true pour voir les différentes requêtes effectuées par l'ORM
});
//on exporte pour utiliser notre connexion depuis les autre fichiers.
module.exports = db;
