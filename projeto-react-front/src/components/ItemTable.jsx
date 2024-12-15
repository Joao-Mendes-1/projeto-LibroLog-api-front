import React from 'react';
import styles from '../styles/components/ItemTable.module.css'; // Importa estilos específicos para a tabela de itens

function ItemTable({ items, onItemClick, onRemoveItem }) {
  return (
    <div className={styles['item-table-container']}>
      {/* Container principal do catálogo horizontal */}
      <div className={styles['item-catalog-horizontal-container']}>
        <div className={styles['item-catalog-horizontal']}>
          {items.map((item) => (
            <div key={item.id} className={styles['item-card-horizontal']}>
              {/* Exibe a imagem do item; utiliza uma imagem padrão caso nenhuma seja fornecida */}
              <img
                src={item.imagem || 'default-image.jpg'}
                alt={item.nome}
                className={styles['item-card-image-horizontal']}
                onClick={() => onItemClick(item.id)} // Abre detalhes ao clicar na imagem
              />
              <h3 className={styles['item-card-title']}>{item.nome}</h3>
              {/* Botão para remover o item */}
              <button
                className={styles['item-remove-button']}
                onClick={(e) => {
                  e.stopPropagation(); // Impede o clique de acionar a função de abrir detalhes
                  onRemoveItem(item.id); // Remove o item via callback fornecido
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
