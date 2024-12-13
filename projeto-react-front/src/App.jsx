import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemTable from './components/ItemTable';
import ItemDetails from './components/ItemDetails';
import ItemForm from './components/ItemForm';
import './styles/App.css';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/livros')
      .then(response => setItems(response.data))
      .catch(error => console.error('Erro ao carregar os itens', error));
  }, []);

  const handleItemClick = (itemId) => {
    console.log(`Item clicked: ${itemId}`); // Verificando o ID do item
    axios.get(`http://localhost:8080/livros/${itemId}`)
      .then(response => {
        console.log('Item carregado:', response.data); // Verificando os dados do item
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
    console.log('Item a ser atualizado:', updatedItem); // Verificando dados do item para atualização
    axios.put(`http://localhost:8080/livros/${updatedItem.id}`, updatedItem)
      .then(() => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
        setSelectedItem(null); // Fecha o detalhe do item após atualizar
      })
      .catch(error => console.error('Erro ao editar item', error));
  };

  return (
    <div className="main-container">
      <ItemForm onAddItem={addItem} />
      <ItemTable items={items} onItemClick={handleItemClick} onRemoveItem={removeItem} />
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

export default App;
