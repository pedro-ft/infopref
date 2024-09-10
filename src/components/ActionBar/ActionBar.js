import React from 'react';
import styles from './ActionBar.module.css';
import { useNavigate } from 'react-router-dom';

function ActionBarPadrao(props) {
  const navigate = useNavigate(); // Usando o hook useNavigate

  const handleNewOSClick = () => {
    navigate('/novosolicitante'); // Redirecionando para a rota /nova-os
  };

  return (
    <div className={styles.actionBar}>
      <button className={styles.actionButton} onClick={handleNewOSClick}>{props.tipo}</button>
      <form className={styles.searchForm}>
        <label htmlFor="protocolSearch" className={styles.visuallyHidden}>Pesquisar</label>
        <input
          type="search"
          id="normalSearch"
          placeholder="Pesquisar"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <img src="imagens/filtros.svg" alt="Pesquisar" className={styles.searchIcon} />
        </button>
      </form>
    </div>
  );
}

export default ActionBarPadrao;