import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ActionBar.module.css';

function ActionBarPadrao({ tipo, link, onSearch, onSort, sortOptions, showChangePassword }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
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

  const openPasswordModal = () => {
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const handlePasswordSave = () => {
    // Lógica para salvar a nova senha
    closePasswordModal();
  };

  useEffect(() => {
    onSort(selectedSort);
  });

  return (
    <div className={styles.actionBar}>
      <button className={styles.actionButton} onClick={handleNewClick}>{tipo}</button>
      {showChangePassword && (
        <button className={styles.actionButton} onClick={openPasswordModal}>
          Alterar Senha
        </button>
      )}

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
       {showPasswordModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Alterar Senha</h2>
            <label>Senha Antiga</label>
            <input type="password" />
            <label>Senha Nova</label>
            <input type="password" />
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={closePasswordModal}>Cancelar</button>
              <button className={styles.confirmButton} onClick={handlePasswordSave}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionBarPadrao;
