import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/Header.module.css'; // Importando o CSS modularizado
import libroLogLogo from '../styles/imagens/libro-log-removebg.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <img src={libroLogLogo} alt="Logo da LibroLog" />
      </div>
      <nav className={styles.nav}>
        <Link to="/catalogo">Catálogo</Link>
        <a href="#sobre-nos">Sobre Nós</a> 
        <a href="#contato">Contato</a> 
      </nav>
    </header>
  );
};

export default Header;
