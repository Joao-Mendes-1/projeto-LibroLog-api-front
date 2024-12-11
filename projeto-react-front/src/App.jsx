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
    axios.get('http://localhost:5000/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Erro ao carregar os itens', error));
  }, []);

  const handleItemClick = (itemId) => {
    axios.get(`http://localhost:5000/items/${itemId}`)
      .then(response => setSelectedItem(response.data))
      .catch(error => console.error('Erro ao carregar o item', error));
  };

  const addItem = (newItem) => {
    return axios.post('http://localhost:5000/items', newItem)
      .then(response => setItems([...items, response.data]))
      .catch(error => console.error('Erro ao adicionar item', error));
  };

  const removeItem = (itemId) => {
    axios.delete(`http://localhost:5000/items/${itemId}`)
      .then(() => setItems(items.filter(item => item.id !== itemId)))
      .catch(error => console.error('Erro ao remover item', error));
  };

  const updateItem = (updatedItem) => {
    axios.put(`http://localhost:5000/items/${updatedItem.id}`, updatedItem)
      .then(() => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
        setSelectedItem(null); // Oculta o componente após salvar
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
          onClose={() => setSelectedItem(null)} // Oculta o componente de detalhes
        />
      )}
    </div>
  );
}

export default App;
