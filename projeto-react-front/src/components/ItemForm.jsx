import React, { useState } from 'react';
import '../styles/App.css';

function ItemForm({ onAddItem }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name };
    onAddItem(newItem);
    setName('');
  };

  return (
    <div className="item-form-container">
      <h2 className="item-form-title">Adicionar Novo Item</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do item"
          required
          className="item-form-input"
        />
        <button type="submit" className="item-form-button">Adicionar</button>
      </form>
    </div>
  );
}

export default ItemForm;
