
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 5000;

// Configurar Passport
require('./config/passport')(passport);


// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/tiendaERDE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos', err));

// Middlewares
app.use(express.json());
app.use(passport.initialize());

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
