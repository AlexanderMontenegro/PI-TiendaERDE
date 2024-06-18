import React from 'react';
import '../Styles/productCard.css'; // Estilos específicos para el ProductCard

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <button>Añadir al Carrito</button>
    </div>
  );
};

export default ProductCard;
