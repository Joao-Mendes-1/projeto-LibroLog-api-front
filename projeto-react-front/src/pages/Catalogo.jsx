import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ItemTable from '../components/ItemTable';
import ItemDetails from '../components/ItemDetails';
import ItemForm from '../components/ItemForm';

function Catalogo() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const carouselRef = useRef(null);
  const scrollVelocity = useRef(0);
  useEffect(() => {
    document.title = "Catálogo - LibroLog"; // Altera o título da página para 'Catálogo - LibroLog'
  }, []);
  useEffect(() => {
    axios.get('http://localhost:8080/livros')
      .then(response => setItems(response.data))
      .catch(error => console.error('Erro ao carregar os itens', error));
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;

    const handleWheel = (event) => {
      event.preventDefault();
      scrollVelocity.current += event.deltaY * 0.5; // Ajuste a sensibilidade
    };

    const smoothScroll = () => {
      if (Math.abs(scrollVelocity.current) > 0.1) {
        carousel.scrollLeft += scrollVelocity.current;
        scrollVelocity.current *= 0.9; // Reduz a velocidade gradualmente
        requestAnimationFrame(smoothScroll);
      } else {
        scrollVelocity.current = 0; // Para completamente ao final
      }
    };

    const startSmoothScroll = () => {
      if (scrollVelocity.current !== 0) {
        smoothScroll();
      }
    };

    carousel.addEventListener('wheel', handleWheel);
    const intervalId = setInterval(startSmoothScroll, 16); // Executa a cada ~16ms (60fps)

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

  return (
    <div>
      <ItemForm onAddItem={addItem} />
      <div ref={carouselRef} style={{ display: 'flex', overflowX: 'auto', gap: '15px' }}>
        <ItemTable items={items} onItemClick={handleItemClick} onRemoveItem={removeItem} />
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
