const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Ruta para registro de usuarios
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = await User.create({ username, password: hashedPassword });

    // Genera el token de autenticación
    const token = jwt.sign(
      { userId: newUser.id, username: newUser.username },
      'tu_secreto',
      { expiresIn: '1h' }
    );

    res.status(201).json({ userId: newUser.id, username: newUser.username, token });
  } catch (error) {
    console.error(error);
         res.status(500).json({ message: 'Error al registrar usuario' });
}
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
const { username, password } = req.body;

try {
  // Busca el usuario en la base de datos
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Verifica la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Genera el token de autenticación
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    'tu_secreto',
    { expiresIn: '1h' }
  );

  res.status(200).json({ userId: user.id, username: user.username, token });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error al iniciar sesión' });
}
});

module.exports = router;

