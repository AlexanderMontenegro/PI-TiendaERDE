import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">ERDE D&C</Link>
      <div className="nav-links">
        <Link to="/register">Registro</Link>
        <Link to="/contact">Contacto</Link>
        <Link to="/cart">Carrito</Link>
      </div>
    </nav>
  );
};

export default Navbar;
