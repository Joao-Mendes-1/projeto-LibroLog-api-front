import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ItemTable from '../components/ItemTable';
import ItemDetails from '../components/ItemDetails';
import ItemForm from '../components/ItemForm';
import Filtro from '../components/Filtro';
import '../styles/Catalogo.css';


function Catalogo() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // Para armazenar os itens filtrados
  const [genres, setGenres] = useState([]); // Para armazenar os gêneros disponíveis
  const [selectedGenres, setSelectedGenres] = useState([]); // Para armazenar os gêneros selecionados
  const [selectedItem, setSelectedItem] = useState(null);
  const carouselRef = useRef(null);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    document.title = "Catálogo - LibroLog"; // Altera o título da página para 'Catálogo - LibroLog'
  }, []);
  
  useEffect(() => {
    axios.get('http://localhost:8080/livros')
      .then(response => {
        const livros = response.data;
        setItems(livros);
        setFilteredItems(livros);

        // Extrair gêneros únicos
        const allGenres = livros.flatMap(livro => livro.generos || []);
        const uniqueGenres = [...new Set(allGenres)];
        setGenres(uniqueGenres);
      })
      .catch(error => console.error('Erro ao carregar os itens', error));
  }, []);

  useEffect(() => {
    // Faz a requisição quando o filtro de gêneros for alterado
    if (selectedGenres.length > 0) {
      const generoQuery = selectedGenres.join(',');
      axios.get(`http://localhost:8080/livros/filtro?genero=${generoQuery}`)
        .then(response => {
          setFilteredItems(response.data);
        })
        .catch(error => console.error('Erro ao carregar livros filtrados', error));
    } else {
      // Se não houver gênero selecionado, mostra todos os livros
      setFilteredItems(items);
    }
  }, [selectedGenres, items]); // Quando selectedGenres mudar, atualiza a lista filtrada

  useEffect(() => {
    const carousel = carouselRef.current;
  
    // Controla a velocidade da rolagem
    const scrollSensitivity = 10; // Aumentar esse valor vai fazer a rolagem mais rápida
    const friction = 0.85; // A diminuição da velocidade ao longo do tempo
  
    const handleWheel = (event) => {
      event.preventDefault();
      scrollVelocity.current += event.deltaY * scrollSensitivity; // Aumenta a velocidade da rolagem
    };
  
    const smoothScroll = () => {
      if (Math.abs(scrollVelocity.current) > 1) { // Menor valor para mais sensibilidade
        carousel.scrollLeft += scrollVelocity.current;
        scrollVelocity.current *= friction; // Fricção para suavizar a rolagem
        requestAnimationFrame(smoothScroll); // Mantém a animação fluida
      } else {
        scrollVelocity.current = 0; // Para a rolagem quando a velocidade for pequena o suficiente
      }
    };
  
    const startSmoothScroll = () => {
      if (scrollVelocity.current !== 0) {
        smoothScroll(); // Inicia a rolagem suave quando necessário
      }
    };
  
    carousel.addEventListener('wheel', handleWheel);
    const intervalId = setInterval(startSmoothScroll, 16); // Mantém a animação fluida
  
    return () => {
      carousel.removeEventListener('wheel', handleWheel);
      clearInterval(intervalId);
    };
  }, []);
  

  const handleItemClick = (itemId) => {
    axios.get(`http://localhost:8080/livros/${itemId}`)
      .then(response => {
        setSelectedItem(response.data);
      })
      .catch(error => console.error('Erro ao carregar o item', error));
  };

  const addItem = (newItem) => {
    axios.post('http://localhost:8080/livros', newItem)
      .then(response => setItems([...items, response.data]))
      .catch(error => console.error('Erro ao adicionar item', error));
  };

  const removeItem = (itemId) => {
    axios.delete(`http://localhost:8080/livros/${itemId}`)
      .then(() => setItems(items.filter(item => item.id !== itemId)))
      .catch(error => console.error('Erro ao remover item', error));
  };

  const updateItem = (updatedItem) => {
    axios.put(`http://localhost:8080/livros/${updatedItem.id}`, updatedItem)
      .then(() => {
        setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        setSelectedItem(null);
      })
      .catch(error => console.error('Erro ao editar item', error));
  };
  const handleFilterChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

   return (
    <div className="main-container">
      <ItemForm onAddItem={addItem} />
      <div className="catalogo-layout">
        <div className="catalogo-filtro">
          <Filtro onFilterChange={handleFilterChange} />
        </div>
        <div ref={carouselRef} className="catalogo-carrossel">
          <ItemTable
            items={filteredItems}
            onItemClick={handleItemClick}
            onRemoveItem={removeItem}
          />
        </div>
      </div>
      {selectedItem && (
        <ItemDetails
          item={selectedItem}
          onUpdateItem={updateItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  ); 

}

export default Catalogo;
