require('dotenv').config();
const express = require('express');
const passport = require('passport');
const sequelize = require('./config/database');
const User = require('./models/User');
const Product = require('./models/Product');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(passport.initialize());

// Configurar Passport
require('./config/passport')(passport);

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
