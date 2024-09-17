import React, { useContext, useState } from 'react';
import styles from './Cabecalho.module.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Cabecalho = () => {
  const { username, avatarUrl } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const urlCorreto= `/${avatarUrl}`
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmLogout = () => {
    // Adicione aqui a lógica de logout
    closeModal();
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <>
      <header className={styles.header}>
        <img loading="lazy" src="/imagens/LogoEmpresa.png" className={styles.logo} alt="Company logo" />
        <div className={styles.userInfo}>
          <div className={styles.userProfile}>
            <img loading="lazy" src={urlCorreto} className={styles.avatar} alt="User avatar" />
            <span className={styles.userName}>{username}</span>
          </div>
          <button className={styles.logoutIcon} onClick={openModal} aria-label="Logout">
            <img loading="lazy" src="/imagens/sair.svg" alt="Logout" />
          </button>
        </div>
      </header>

      {/* Certifique-se de que o modal esteja fora do <header> */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Logout</h2>
            <p>Tem certeza que deseja sair?</p>
            <div className={styles.modalActions}>
              <button onClick={handleConfirmLogout} className={styles.confirmButton}>Sim</button>
              <button onClick={closeModal} className={styles.cancelButton}>Não</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cabecalho;
