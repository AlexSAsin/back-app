const DB_CONFIG = require("./db.config");

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({ ...DB_CONFIG[process.env.NODE_ENV], dialect: "postgres" });

module.exports.sequelize = sequelize;
module.exports.models = sequelize.models;