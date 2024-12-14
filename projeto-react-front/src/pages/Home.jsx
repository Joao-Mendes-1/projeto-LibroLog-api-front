// pages/Home.jsx
import React, { useEffect } from 'react';
import Header from '../components/Header.jsx';
import Main from '../components/Main.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/Home.css'; 

const Home = () => {
  useEffect(() => {
    document.title = "Home - LibroLog"; // Altera o título da página para 'Home - LibroLog'
  }, []);

  return (
    <div className="home-container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
