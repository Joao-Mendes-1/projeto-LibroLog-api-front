import React from 'react';
import '../styles/App.css';

function ItemTable({ items, onItemClick, onRemoveItem }) {
  return (
    <div className="item-table-container">
      <div className="item-catalog-horizontal-container">
        <div className="item-catalog-horizontal">
          {items.map((item) => (
            <div key={item.id} className="item-card-horizontal">
              <img
                src={item.imagem ? item.imagem : 'default-image.jpg'}
                alt={item.nome}
                className="item-card-image-horizontal"
                onClick={() => onItemClick(item.id)}
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
    </div>
  );
}

export default ItemTable;
