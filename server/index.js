require('dotenv').config(); // Carga las variables de entorno desde .env
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const sequelize = require('./config/db'); // Asegúrate de importar db.js correctamente

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error al iniciar el servidor:', err));
