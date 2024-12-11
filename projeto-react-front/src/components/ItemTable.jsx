import React from 'react';
import '../styles/App.css';

function ItemTable({ items, onItemClick, onRemoveItem }) {
  return (
    <div className="item-table-container">
      <h2 className="item-table-title">Lista de Itens</h2>
      <div className="item-catalog">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="item-card-image"
              onClick={() => onItemClick(item.id)} // Abre o detalhe
            />
            <h3 className="item-card-title">{item.name}</h3>
            <button
              className="item-remove-button"
              onClick={(e) => {
                e.stopPropagation(); // Evita conflito com o clique da imagem
                onRemoveItem(item.id); // Chama a função de remoção
              }}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemTable;
