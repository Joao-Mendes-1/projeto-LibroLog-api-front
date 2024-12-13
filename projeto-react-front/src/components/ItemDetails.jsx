import React, { useState } from 'react';
import '../styles/App.css';

function ItemDetails({ item, onUpdateItem, onClose }) {
  const [nome, setNome] = useState(item.nome);
  const [autor, setAutor] = useState(item.autor);
  const [ano, setAno] = useState(item.ano);
  const [genero, setGenero] = useState(item.genero);
  const [imagem, setImagem] = useState(item.imagem);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    const updatedItem = { ...item, nome, autor, ano, genero, imagem };
    onUpdateItem(updatedItem);
    setIsEditing(false); // Para mostrar os detalhes novamente após a edição
  };

  return (
    <div className="detalhe-item">
      <h2>Detalhes do Item</h2>
      {!isEditing ? (
        <>
          <p><strong>Nome:</strong> {item.nome}</p>
          <p><strong>Autor:</strong> {item.autor}</p>
          <p><strong>Ano:</strong> {item.ano}</p>
          <p><strong>Gênero:</strong> {item.genero}</p>
          <button onClick={() => setIsEditing(true)} className="item-form-button">Editar</button>
        </>
      ) : (
        <div className="item-form">
          <p>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="item-form-input"
            />
          </p>
          <p>
            Autor:
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="item-form-input"
            />
          </p>
          <p>
            Ano:
            <input
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="item-form-input"
            />
          </p>
          <p>
            Gênero:
            <input
              type="text"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="item-form-input"
            />
          </p>
          <p>
            Imagem (URL):
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="item-form-input"
            />
          </p>
          <div className="form-buttons">
            <button onClick={handleUpdate} className="item-form-button">Salvar</button>
            <button onClick={() => setIsEditing(false)} className="item-form-button">Cancelar</button>
          </div>
        </div>
      )}
      {/* Escondendo o botão Fechar se estiver editando */}
      {!isEditing && <button onClick={onClose} className="item-form-button">Fechar</button>}
    </div>
  );
}

export default ItemDetails;
