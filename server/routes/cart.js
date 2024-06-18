const express = require('express');
const router = express.Router();
const passport = require('passport');

// Importar modelo de Carrito
const Cart = require('../models/Cart');

// Ruta para obtener el carrito del usuario
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Cart.findOne({ userId: req.user.id })
    .populate('products.productId')
    .then(cart => res.json(cart))
    .catch(err => console.error(err));
});

// Ruta para añadir producto al carrito
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { productId, quantity } = req.body;
  Cart.findOne({ userId: req.user.id }).then(cart => {
    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId == productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      cart.save()
        .then(cart => res.json(cart))
        .catch(err => console.error(err));
    } else {
      const newCart = new Cart({
        userId: req.user.id,
        products: [{ productId, quantity }],
      });
      newCart.save()
        .then(cart => res.json(cart))
        .catch(err => console.error(err));
    }
  });
});

module.exports = router;
