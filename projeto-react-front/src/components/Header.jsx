import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // Reutilizando o estilo da Home
import libroLogLogo from '../styles/imagens/libro-log-removebg.png';

const Header = () => {
  return (
    <header className="home-header">
      <div className="logo">
        <img src={libroLogLogo} alt="Logo da LibroLog" />
      </div>
      <nav className="nav-menu">
        <Link to="/catalogo">Catálogo</Link>
        <Link to="#sobre-nos">Sobre Nós</Link>
        <Link to="#contato">Contato</Link>
      </nav>
    </header>
  );
};

export default Header;
