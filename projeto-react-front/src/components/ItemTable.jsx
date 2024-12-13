import React from 'react';
import '../styles/App.css';

function ItemTable({ items, onItemClick, onRemoveItem }) {
  return (
    <div className="item-table-container">
      <h2 className="item-table-title">Catálogo de Livros</h2>
      <div className="item-catalog">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img
              src={item.imagem ? item.imagem : 'default-image.jpg'}
              alt={item.nome}
              className="item-card-image"
              onClick={() => onItemClick(item.id)} // Alterado para passar o ID do item
            />
            <h3 className="item-card-title">{item.nome}</h3>
            <button
              className="item-remove-button"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveItem(item.id);
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
