import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/components/Filtro.module.css'; // Alterado para `styles`

function Filtro({ onFilterChange }) {
  const [generos, setGeneros] = useState([]);
  const [selectedGeneros, setSelectedGeneros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/livros/generos')
      .then(response => setGeneros(response.data))
      .catch(error => console.error('Erro ao carregar os gêneros', error));
  }, []);

  const handleCheckboxChange = (genero) => {
    const newSelectedGeneros = selectedGeneros.includes(genero)
      ? selectedGeneros.filter(g => g !== genero)
      : [...selectedGeneros, genero];

    setSelectedGeneros(newSelectedGeneros);
    onFilterChange(newSelectedGeneros);
  };

  return (
    <div className={styles["filtro-container"]}> {/* Usando o objeto styles */}
      <h3 className={styles["filtro-title"]}>Filtrar por Gênero</h3>
      {generos.length === 0 ? (
        <p className={styles["loading-text"]}>Carregando gêneros...</p>
      ) : (
        generos.map(genero => (
          <label key={genero.genero} className={styles["filtro-item"]}>
            <input
              type="checkbox"
              value={genero.genero}
              checked={selectedGeneros.includes(genero.genero)}
              onChange={() => handleCheckboxChange(genero.genero)}
              className={styles["filtro-checkbox"]}
            />
            {genero.genero}
          </label>
        ))
      )}
    </div>
  );
}

export default Filtro;
