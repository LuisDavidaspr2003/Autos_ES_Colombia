import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Navbar.css';  // Asegúrate de crear este archivo CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MiAplicacion</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/administrador">Administrador</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/celdas-estacionamiento">Celdas de Estacionamiento</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/entradas-salidas">Entradas-Salidas</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/pagos">Proceso de Pago</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/vehiculos">Gestión de Vehículos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
