import React, {useState} from 'react';
import styles from './ActionBarOS.module.css';
import { useNavigate } from 'react-router-dom';

function ActionBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Usando o hook useNavigate

  const handleNewOSClick = () => {
    navigate('/novaos'); // Redirecionando para a rota /nova-os
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };


  return (
    <div className={styles.actionBar}>
      <button className={styles.actionButton} onClick={handleNewOSClick}>Nova O. S.</button>
      <button className={styles.actionButton}>O. S. Solicitadas</button>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <label htmlFor="protocolSearch" className={styles.visuallyHidden}>Pesquisar Nº de protocolo</label>
        <input
          type="search"
          id="protocolSearch"
          placeholder="Pesquisar Nº de protocolo"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <img src="/imagens/filtros.svg" alt="Pesquisar" className={styles.searchIcon} />
        </button>
      </form>
    </div>
  );
}

export default ActionBar;