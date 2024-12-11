import React, { useState, useEffect } from 'react';
import '../styles/App.css'; // Importe o arquivo CSS com a estilização

function ItemDetails({ item, onUpdateItem, onClose }) {
  const [name, setName] = useState(item.name);
  const [author, setAuthor] = useState(item.author);
  const [year, setYear] = useState(item.year);
  const [genre, setGenre] = useState(item.genre);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);

  const handleUpdate = () => {
    const updatedItem = { ...item, name, author, year, genre, imageUrl };
    onUpdateItem(updatedItem);
    onClose(); // Notifica o pai para fechar o componente
  };

  return (
    <div className="detalhe-item">
      <h2>Detalhes do Item</h2>
      <p>ID: {item.id}</p>
      <div className="item-form">
        <p>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="item-form-input" // Classe para o campo de input
          />
        </p>
        <p>
          Autor:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="item-form-input"
          />
        </p>
        <p>
          Ano:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="item-form-input"
          />
        </p>
        <p>
          Gênero:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="item-form-input"
          />
        </p>
        <p>
          Imagem (URL):
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="item-form-input"
          />
        </p>
        <button onClick={handleUpdate} className="item-form-button">Salvar</button>
      </div>
      <button onClick={onClose} className="item-form-button">Fechar</button>
    </div>
  );
}

export default ItemDetails;
