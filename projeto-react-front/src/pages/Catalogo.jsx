import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ItemTable from '../components/ItemTable';
import ItemDetails from '../components/ItemDetails';
import ItemForm from '../components/ItemForm';
import Filtro from '../components/Filtro';
import '../styles/Catalogo.css';

function Catalogo() {
  // Estados para gerenciar os itens, itens filtrados, gêneros, e o item selecionado
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // Itens após o filtro
  const [genres, setGenres] = useState([]); // Gêneros disponíveis
  const [selectedGenres, setSelectedGenres] = useState([]); // Gêneros selecionados para o filtro
  const [selectedItem, setSelectedItem] = useState(null); // Item selecionado para exibição detalhada
  const carouselRef = useRef(null); // Referência ao carrossel para manipulação direta
  const scrollVelocity = useRef(0); // Controla a velocidade de rolagem suave

  // Altera o título da página ao carregar o componente
  useEffect(() => {
    document.title = "Catálogo - LibroLog";
  }, []);

  // Carrega os itens e os gêneros disponíveis ao montar o componente
  useEffect(() => {
    axios.get('http://localhost:8080/livros')
      .then(response => {
        const livros = response.data;
        setItems(livros);
        setFilteredItems(livros); // Inicialmente, mostra todos os itens

        // Extrai os gêneros únicos dos livros
        const allGenres = livros.flatMap(livro => livro.generos || []);
        const uniqueGenres = [...new Set(allGenres)];
        setGenres(uniqueGenres);
      })
      .catch(error => console.error('Erro ao carregar os itens', error));
  }, []);

  // Aplica o filtro de gêneros aos livros sempre que a seleção de gêneros mudar
  useEffect(() => {
    if (selectedGenres.length > 0) {
      const generoQuery = selectedGenres.join(',');
      axios.get(`http://localhost:8080/livros/filtro?genero=${generoQuery}`)
        .then(response => {
          setFilteredItems(response.data);
        })
        .catch(error => console.error('Erro ao carregar livros filtrados', error));
    } else {
      setFilteredItems(items); // Se nenhum filtro for aplicado, mostra todos os itens
    }
  }, [selectedGenres, items]); // Dependência dos gêneros e dos itens

  // Controla a rolagem suave do carrossel
  useEffect(() => {
    const carousel = carouselRef.current;

    // Verifica se o navegador é o Google Chrome
    const isChrome = /chrome|crios/i.test(navigator.userAgent) && !/edge/i.test(navigator.userAgent);

    const scrollSensitivity = isChrome ? 10000 : 10; // Sensibilidade da rolagem (10000 no Chrome)
    const friction = 0.85; // Fator de fricção para desacelerar a rolagem

    const scrollVelocity = { current: 0 };

    // Função que lida com o evento de rolagem
    const handleWheel = (event) => {
      event.preventDefault();
      scrollVelocity.current += event.deltaY * scrollSensitivity;
    };

    // Função que executa a rolagem suave
    const smoothScroll = () => {
      if (Math.abs(scrollVelocity.current) > 1) {
        carousel.scrollLeft += scrollVelocity.current;
        scrollVelocity.current *= friction; // Aplica a fricção
        requestAnimationFrame(smoothScroll); // Continua o ciclo de animação
      } else {
        scrollVelocity.current = 0; // Para a animação quando a velocidade for insignificante
      }
    };

    // Inicia a rolagem suave
    const startSmoothScroll = () => {
      if (scrollVelocity.current !== 0) {
        smoothScroll();
      }
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false }); // Garante que o preventDefault funcione

    // Inicia o loop para animação fluida
    const intervalId = setInterval(startSmoothScroll, 16);
  
    // Remove eventos e limpa intervalos ao desmontar o componente
    return () => {
      carousel.removeEventListener('wheel', handleWheel);
      clearInterval(intervalId);
    };
  }, []); // Hook de efeito

  // Função para tratar o clique em um item (abre detalhes)
  const handleItemClick = (itemId) => {
    axios.get(`http://localhost:8080/livros/${itemId}`)
      .then(response => {
        setSelectedItem(response.data); // Exibe detalhes do item selecionado
      })
      .catch(error => console.error('Erro ao carregar o item', error));
  };

  // Função para adicionar um novo item
  const addItem = (newItem) => {
    axios.post('http://localhost:8080/livros', newItem)
      .then(response => setItems([...items, response.data])) // Adiciona o item ao estado
      .catch(error => console.error('Erro ao adicionar item', error));
  };

  // Função para remover um item
  const removeItem = (itemId) => {
    axios.delete(`http://localhost:8080/livros/${itemId}`)
      .then(() => setItems(items.filter(item => item.id !== itemId))) // Remove o item do estado
      .catch(error => console.error('Erro ao remover item', error));
  };

  // Função para atualizar um item
  const updateItem = (updatedItem) => {
    axios.put(`http://localhost:8080/livros/${updatedItem.id}`, updatedItem)
      .then(() => {
        setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        setSelectedItem(null); // Fecha a exibição do item após atualização
      })
      .catch(error => console.error('Erro ao editar item', error));
  };

  // Função para lidar com a mudança de filtro de gêneros
  const handleFilterChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres); // Atualiza os gêneros selecionados
  };

  return (
    <div className="main-container">
      <ItemForm onAddItem={addItem} /> {/* Formulário para adicionar novos itens */}
      <div className="catalogo-layout">
        <div className="catalogo-filtro">
          <Filtro onFilterChange={handleFilterChange} /> {/* Filtro para gêneros */}
        </div>
        <div ref={carouselRef} className="catalogo-carrossel">
          <ItemTable
            items={filteredItems} // Passa os itens filtrados
            onItemClick={handleItemClick} // Lida com o clique no item
            onRemoveItem={removeItem} // Lida com a remoção do item
          />
        </div>
      </div>
      {selectedItem && (
        <ItemDetails
          item={selectedItem} // Passa os detalhes do item selecionado
          onUpdateItem={updateItem} // Lida com a atualização do item
          onClose={() => setSelectedItem(null)} // Fecha os detalhes do item
        />
      )}
    </div>
  );
}

export default Catalogo;
