import React, { useState, useEffect } from 'react';
import styles from '../styles/components/ItemDetails.module.css';

function ItemDetails({ item, onUpdateItem, onClose }) {
  // Estados locais para gerenciar os detalhes do item
  const [nome, setNome] = useState(item.nome); 
  const [autor, setAutor] = useState(item.autor);
  const [ano, setAno] = useState(item.ano); 
  const [genero, setGenero] = useState(item.genero); 
  const [imagem, setImagem] = useState(item.imagem); 
  const [isEditing, setIsEditing] = useState(false); 

  // Atualiza os estados locais quando o item recebido como prop mudar
  useEffect(() => {
    setNome(item.nome);
    setAutor(item.autor);
    setAno(item.ano);
    setGenero(item.genero);
    setImagem(item.imagem);
  }, [item]); // Dependência no "item", garantindo atualização ao receber novos dados

  // Função para lidar com a atualização do item
  const handleUpdate = () => {
    const updatedItem = { ...item, nome, autor, ano, genero, imagem }; // Cria um novo objeto com os dados atualizados
    onUpdateItem(updatedItem); // Chama a função de callback para atualizar o item no componente pai
    setIsEditing(false); // Sai do modo de edição
  };

  return (
    <div className={styles.detalheItem}> {/* Container principal dos detalhes do item */}
      <h2>Detalhes do Item</h2>
      {!isEditing ? ( // Verifica se está no modo de visualização
        <>
          {/* Exibe os detalhes do item */}
          <p><strong>Nome:</strong> {item.nome}</p>
          <p><strong>Autor:</strong> {item.autor}</p>
          <p><strong>Ano:</strong> {item.ano}</p>
          <p><strong>Gênero:</strong> {item.genero}</p>
          <button
            onClick={() => setIsEditing(true)} // Ativa o modo de edição
            className={styles.itemFormButton}
          >
            Editar
          </button>
        </>
      ) : ( // Renderiza o formulário de edição
        <div className={styles.itemForm}>
          <p>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={styles.itemFormInput}
            />
          </p>
          <p>
            Autor:
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className={styles.itemFormInput}
            />
          </p>
          <p>
            Ano:
            <input
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className={styles.itemFormInput}
            />
          </p>
          <p>
            Gênero:
            <input
              type="text"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className={styles.itemFormInput}
            />
          </p>
          <p>
            Imagem (URL):
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className={styles.itemFormInput}
            />
          </p>
          <div className={styles.formButtons}> {/* Botões de ação no formulário */}
            <button onClick={handleUpdate} className={styles.itemFormButton}>Salvar</button>
            <button
              onClick={() => setIsEditing(false)} // Cancela a edição
              className={styles.itemFormButtonOut}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {!isEditing && ( // Botão de fechar, exibido apenas no modo de visualização
        <button
          onClick={onClose} // Chama a função de callback para fechar o modal
          className={styles.itemFormButtonOut}
        >
          Fechar
        </button>
      )}
    </div>
  );
}

export default ItemDetails;
