import React from 'react';
import '../styles/Home.css'; // Reutilizando o estilo da Home

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="footer-logo">
      </div>
      <p>&copy; 2024 LibroLog — Todos os direitos reservados.</p>
      <div className="social-links">
        <a href="https://facebook.com/librolog" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com/librolog" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com/librolog" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
