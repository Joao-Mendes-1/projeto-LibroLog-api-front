import React from 'react';
import '../styles/App.css'; // Estilos específicos para o Header

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <nav>
        <ul className="nav-list">
          <li><a href="/" className="nav-item">Home</a></li>
          <li><a href="/about" className="nav-item">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
