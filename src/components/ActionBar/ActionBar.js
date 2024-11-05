import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ActionBar.module.css';
import { UserContext } from '../context/UserContext';

function ActionBarPadrao({ tipo, link, onSearch, onSort, sortOptions, showChangePassword }) {
  const { userProfile } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const navigate = useNavigate();

  const handleNewClick = () => {
    navigate(`/${link}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleBackClick = () => {
    if (userProfile === 'ADM') {
      navigate('/menu');
    } else if (userProfile === 'TECNICO') {
      navigate('/menu2');
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
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
  });

  return (
    <div className={styles.actionBar}>
      {userProfile !== 'SOLICITANTE' && (
      <button onClick={handleBackClick} className={styles.backButton} aria-label='Voltar'>
        <img loading="lazy" src="/imagens/Voltar.svg" alt="Voltar" />
      </button>
      )}
      <button className={styles.actionButton} onClick={handleNewClick}>{tipo}</button>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <label htmlFor="Search" className={styles.visuallyHidden}>Pesquisar</label>
        <input
          type="search"
          id="normalSearch"
          placeholder="Pesquisar"
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="button" className={styles.searchButton} onClick={toggleSortOptions}>
          <img src="/imagens/filtros.svg" alt="Ordenar" className={styles.searchIcon} />
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

export default ActionBarPadrao;
