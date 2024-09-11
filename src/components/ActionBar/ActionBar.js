import React, {useState} from 'react';
import styles from './ActionBar.module.css';
import { useNavigate } from 'react-router-dom';

function ActionBarPadrao({tipo, onSearch}) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Usando o hook useNavigate

  const handleNewClick = () => {
    navigate(`/${tipo}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {  // Verifique se onSearch foi passado como prop
      onSearch(searchTerm);
    } else {
      console.error("onSearch não foi fornecido como prop ao ActionBar");
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  

  return (
    <div className={styles.actionBar}>
      <button className={styles.actionButton} onClick={handleNewClick}>{tipo}</button>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <label htmlFor="protocolSearch" className={styles.visuallyHidden}>Pesquisar</label>
        <input
          type="search"
          id="normalSearch"
          placeholder="Pesquisar"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.searchButton}>
          <img src="imagens/filtros.svg" alt="Pesquisar" className={styles.searchIcon} />
        </button>
      </form>
    </div>
  );
}

export default ActionBarPadrao;