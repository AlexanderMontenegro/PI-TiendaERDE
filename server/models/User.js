const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'erdedc_db',
  username: 'tu_usuario',
  password: 'tu_contraseña',
  host: 'localhost',
  port: 5432,
  define: {
    timestamps: false, // Opcional: desactiva los campos createdAt y updatedAt automáticamente generados
  },
});

module.exports = sequelize;
