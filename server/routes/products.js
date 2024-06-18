// server/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Ruta para obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Ruta para actualizar un producto por ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.update(req.body);
      res.json(product);
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Ruta para eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ success: true });
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
