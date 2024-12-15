import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../styles/imagens/background1.jpeg';
import styles from '../styles/components/Main.module.css'; // Importando o CSS modularizado

const Main = () => {
  return (
    <main className={styles.main}>
      <section className={styles.sobre} id="sobre-nos">
        <h2>Sobre Nós</h2>
        <p>
          Na LibroLog, somos apaixonados por livros e pela magia que eles trazem. Nossa missão é oferecer uma plataforma intuitiva e funcional para ajudar você a organizar sua coleção de forma prática e prazerosa. Com um design simples e acessível, buscamos tornar a gestão de livros uma experiência tão agradável quanto a leitura.
        </p>
        <p>
          Seja para um pequeno acervo ou uma grande biblioteca, LibroLog é o seu mundo literário, organizado e fácil de acessar. Junte-se a nós e transforme a organização dos seus livros em algo mais divertido e eficiente!
        </p>
      </section>

      <section className={styles.section} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h1 className={styles.title}>Seu mundo literário, organizado do seu jeito.</h1>
        <Link to="/catalogo">
          <button className={styles.start}>Iniciar agora</button>
        </Link>
      </section>
    </main>
  );
};

export default Main;
