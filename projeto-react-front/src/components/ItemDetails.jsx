import React, { useState, useEffect } from 'react';
import styles from '../styles/components/ItemDetails.module.css';

function ItemDetails({ item, onUpdateItem, onClose }) {
  const [nome, setNome] = useState(item.nome);
  const [autor, setAutor] = useState(item.autor);
  const [ano, setAno] = useState(item.ano);
  const [genero, setGenero] = useState(item.genero);
  const [imagem, setImagem] = useState(item.imagem);
  const [isEditing, setIsEditing] = useState(false);

  // Atualiza os estados quando o item mudar
  useEffect(() => {
    setNome(item.nome);
    setAutor(item.autor);
    setAno(item.ano);
    setGenero(item.genero);
    setImagem(item.imagem);
  }, [item]); // Dependência no item, assim ele atualiza sempre que o item mudar

  const handleUpdate = () => {
    const updatedItem = { ...item, nome, autor, ano, genero, imagem };
    onUpdateItem(updatedItem);
    setIsEditing(false);
  };

  return (
    <div className={styles.detalheItem}>
      <h2>Detalhes do Item</h2>
      {!isEditing ? (
        <>
          <p><strong>Nome:</strong> {item.nome}</p>
          <p><strong>Autor:</strong> {item.autor}</p>
          <p><strong>Ano:</strong> {item.ano}</p>
          <p><strong>Gênero:</strong> {item.genero}</p>
          <button onClick={() => setIsEditing(true)} className={styles.itemFormButton}>Editar</button>
        </>
      ) : (
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
          <div className={styles.formButtons}>
            <button onClick={handleUpdate} className={styles.itemFormButton}>Salvar</button>
            <button onClick={() => setIsEditing(false)} className={styles.itemFormButtonOut}>Cancelar</button>
          </div>
        </div>
      )}
      {!isEditing && <button onClick={onClose} className={styles.itemFormButtonOut}>Fechar</button>}
    </div>
  );
}

export default ItemDetails;
