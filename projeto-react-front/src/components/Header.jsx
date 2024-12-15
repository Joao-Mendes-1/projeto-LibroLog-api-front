import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/Header.module.css'; // Importando o CSS modularizado
import libroLogLogo from '../styles/imagens/libro-log-removebg.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
  };

  return (
    <header className={styles.header}>
      <div>
        <img src={libroLogLogo} alt="Logo da LibroLog" />
      </div>

      {/* Ícone do menu sanduíche */}
      <div className={styles.menuIcon} onClick={toggleMenu}>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`} />
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`} />
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ''}`} />
      </div>

      {/* Menu de navegação */}
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <Link to="/catalogo">Catálogo</Link>
        <a href="#sobre-nos">Sobre Nós</a>
        <a href="#contato">Contato</a>
      </nav>
    </header>
  );
};

export default Header;
