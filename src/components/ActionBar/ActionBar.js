import React from 'react';
import styles from './ActionBar.module.css';

function ActionBar() {
  return (
    <div className={styles.actionBar}>
      <button className={styles.actionButton}>Nova O. S.</button>
      <button className={styles.actionButton}>O. S. Solicitadas</button>
      <form className={styles.searchForm}>
        <label htmlFor="protocolSearch" className={styles.visuallyHidden}>Pesquisar Nº de protocolo</label>
        <input
          type="search"
          id="protocolSearch"
          placeholder="Pesquisar Nº de protocolo"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/77c459a52332f3399713e3788a237de16a16acc92b544d766bd8c5e23eefad10?placeholderIfAbsent=true&apiKey=ddba9bb5471147eeb1c31ee1b49ac2b8" alt="Pesquisar" className={styles.searchIcon} />
        </button>
      </form>
    </div>
  );
}

export default ActionBar;