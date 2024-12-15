import React from 'react';
import styles from '../styles/components/ItemTable.module.css';

function ItemTable({ items, onItemClick, onRemoveItem }) {
  return (
    <div className={styles['item-table-container']}>
      <div className={styles['item-catalog-horizontal-container']}>
        <div className={styles['item-catalog-horizontal']}>
          {items.map((item) => (
            <div key={item.id} className={styles['item-card-horizontal']}>
              <img
                src={item.imagem ? item.imagem : 'default-image.jpg'}
                alt={item.nome}
                className={styles['item-card-image-horizontal']}
                onClick={() => onItemClick(item.id)}
              />
              <h3 className={styles['item-card-title']}>{item.nome}</h3>
              <button
                className={styles['item-remove-button']}
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
