import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/components/Filtro.module.css'; // Importando o arquivo de estilo

function Filtro({ onFilterChange }) {
  // Definindo estados para armazenar os gêneros e os gêneros selecionados
  const [generos, setGeneros] = useState([]); 
  const [selectedGeneros, setSelectedGeneros] = useState([]);

  useEffect(() => {
    // Requisição para obter os gêneros disponíveis da API
    axios.get('http://localhost:8080/livros/generos')
      .then(response => setGeneros(response.data)) // Atualiza o estado com os gêneros recebidos
      .catch(error => console.error('Erro ao carregar os gêneros', error)); // Exibe erro no console em caso de falha
  }, []); 

  // Função para lidar com as mudanças no checkbox de seleção de gênero
  const handleCheckboxChange = (genero) => {
    // Verifica se o gênero já está selecionado
    const newSelectedGeneros = selectedGeneros.includes(genero)
      ? selectedGeneros.filter(g => g !== genero) // Se já estiver, remove da lista
      : [...selectedGeneros, genero]; // Se não estiver, adiciona à lista

    setSelectedGeneros(newSelectedGeneros); // Atualiza o estado com os novos gêneros selecionados
    onFilterChange(newSelectedGeneros); // Chama a função de callback para aplicar o filtro no componente pai
  };

  return (
    <div className={styles["filtro-container"]}> {/* Contêiner do filtro */}
      <h3 className={styles["filtro-title"]}>Filtrar por Gênero</h3>
      {generos.length === 0 ? (
        // Exibe uma mensagem de carregamento enquanto os gêneros estão sendo carregados
        <p className={styles["loading-text"]}>Carregando gêneros...</p>
      ) : (
        // Quando os gêneros são carregados, exibe uma lista de checkboxes
        generos.map(genero => (
          <label key={genero.genero} className={styles["filtro-item"]}>
            <input
              type="checkbox"
              value={genero.genero}
              checked={selectedGeneros.includes(genero.genero)} // Marca o checkbox se o gênero estiver selecionado
              onChange={() => handleCheckboxChange(genero.genero)} // Chama a função ao clicar no checkbox
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
