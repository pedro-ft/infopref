import React, { useState } from 'react';
import styles from './InfoInternetCard.module.css';

function TecnicoCard({ nomeRede, senha, ip, imageUrl, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    closeModal();
    if (onDelete) {
      onDelete(); // Chame a função onDelete para realizar a exclusão do elemento
    }
  };

  return (
  <>
    <article className={styles.card}>
      <img src={imageUrl} alt={`Internet avatar`} className={styles.avatar} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.name}>Nome da Rede: {nomeRede}</h3>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.info}>
            <p>Senha: {senha}</p>
            <p>IP: {ip}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.editButton} aria-label="Edit">
              <img src="imagens/Editar.svg" alt="" />
            </button>
            <button className={styles.deleteButton} onClick={openModal} aria-label="Delete">
              <img src="imagens/Excluir.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </article>

    {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir a Informação da Internet {nomeRede}?</p>
            <div className={styles.modalActions}>
              <button onClick={handleConfirmDelete} className={styles.confirmButton}>Sim</button>
              <button onClick={closeModal} className={styles.cancelButton}>Não</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TecnicoCard;