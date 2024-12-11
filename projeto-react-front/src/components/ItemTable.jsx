import React from 'react';
import '../styles/App.css';

function ItemTable({ items, onItemClick, onRemoveItem }) {
  return (
    <div className="item-table-container">
      <h2 className="item-table-title">Lista de Itens</h2>
      <table className="item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} onClick={() => onItemClick(item.id)}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button
                  className="item-remove-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar conflito com o onClick da linha
                    onRemoveItem(item.id);
                  }}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemTable;
