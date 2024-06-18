require('dotenv').config(); // Carga las variables de entorno desde .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres', // Puedes cambiarlo si estás utilizando otro dialecto SQL
});

module.exports = sequelize;
