import React, { useState } from 'react';
import '../styles/App.css';

function ItemForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, author, year, genre, imageUrl };
    onAddItem(newItem);
    setName('');
    setAuthor('');
    setYear('');
    setGenre('');
    setImageUrl('');
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
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Digite o autor"
          required
          className="item-form-input"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Digite o ano"
          required
          className="item-form-input"
        />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Digite o gênero"
          required
          className="item-form-input"
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Digite a URL da imagem"
          required
          className="item-form-input"
        />
        <button type="submit" className="item-form-button">Adicionar</button>
      </form>
    </div>
  );
}

export default ItemForm;
