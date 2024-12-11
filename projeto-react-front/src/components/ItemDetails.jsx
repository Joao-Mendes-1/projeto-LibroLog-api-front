import React, { useState } from 'react';
import '../styles/App.css'; // Importe o arquivo CSS com a estilização

function ItemDetails({ item, onUpdateItem, onClose }) {
  const [name, setName] = useState(item.name);

  const handleUpdate = () => {
    const updatedItem = { ...item, name };
    onUpdateItem(updatedItem);
    onClose(); // Notifica o pai para fechar o componente
  };

  return (
    <div className="detalhe-item">
      <h2>Detalhes do Item</h2>
      <p>ID: {item.id}</p>
      <p>
        Nome: 
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="item-form-input" // Classe para o campo de input
        />
      </p>
      <button onClick={handleUpdate} className="item-form-button">Salvar</button>
    </div>
  );
}

export default ItemDetails;
