import React, {useState, useEffect} from 'react';
import styles from './ActionBarOS.module.css';
import { useNavigate } from 'react-router-dom';

function ActionBar({ onSearch, onSort, sortOptions}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const navigate = useNavigate();

  const handleNewOSClick = () => {
    navigate('/novaos');
  };

  const handleOSSolicitadasClick = () => {
    navigate('/osSolicitadas');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortChange = (option) => {
    const newSortType = selectedSort === option ? '' : option; 
    setSelectedSort(newSortType); 
    if (onSort) {
      onSort(newSortType); 
    }
  };

  useEffect(() => {
    onSort(selectedSort);
  }, []);


  return (
    <div className={styles.actionBar}>
      <button className={styles.actionButton} onClick={handleNewOSClick}>Nova O. S.</button>
      <button className={styles.actionButton} onClick={handleOSSolicitadasClick}>O. S. Solicitadas</button>
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
        <button type="button" className={styles.searchButton} onClick={toggleSortOptions}>
          <img src="/imagens/filtros.svg" alt="Pesquisar" className={styles.searchIcon} />
        </button>
      </form>
      {showSortOptions && (
        <div className={styles.sortOptions}>
          {sortOptions.map((option, index) => (
            <label key={index} className={styles.sortOptionsLabel}>
              <input
                type="checkbox"
                checked={selectedSort === option}
                onChange={() => handleSortChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActionBar;