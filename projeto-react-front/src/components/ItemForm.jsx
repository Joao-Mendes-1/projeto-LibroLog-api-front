import React, { useState } from 'react';
import '../styles/App.css';

function ItemForm({ onAddItem }) {
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { nome, autor, ano, genero, imagem };
    onAddItem(newItem);
    setNome('');
    setAutor('');
    setAno('');
    setGenero('');
    setImagem('');
  };

  return (
    <div className="item-form-container">
      <h2 className="item-form-title">Adicionar Novo Livro</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome do item"
          required
          className="item-form-input"
        />
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Digite o autor"
          required
          className="item-form-input"
        />
        <input
          type="number"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          placeholder="Digite o ano"
          required
          className="item-form-input"
        />
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          placeholder="Digite o gênero"
          required
          className="item-form-input"
        />
        <input
          type="text"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          placeholder="Digite a URL da imagem"
          required
          className="item-form-input"
        />
        <button type="submit" className="item-form-button">Adicionar</button>
      </form>
    </div>
  );
}

export default ItemForm;
