import React, { useState } from 'react';
import styles from './OSSolicitadasItem.module.css';

function OSSolicitadasItem({ numProtocolo, dataAbertura, patrimonio, solicitante, secretaria, departamento, descricao, imageUrl, onDelete }) {
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
      onDelete();
    }
  };

  return (
  <>
    <article className={styles.card}>
      <img src={imageUrl} alt={`OS avatar`} className={styles.avatar} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.name}>Número de Protocolo: {numProtocolo}</h3>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.info}>
            <p>Data Abertura: {dataAbertura}</p>
            <p>Nº de patrimônio: {patrimonio}</p>
            <p>Descrição: {descricao}</p>
          </div>
          <div className={styles.cardSideSection}>
            <p className={styles.descrTec}>Solicitante: {solicitante}</p>
            <p className={styles.descrTec}>Secretaria: {secretaria}</p>
            <p className={styles.descrTec}>Departamento: {departamento}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.botaoAceitar} aria-label="Aceitar">
                Aceitar
            </button>
            <button className={styles.botaoRejeitar} onClick={openModal} aria-label="Rejeitar">
                Rejeitar
            </button>
          </div>
        </div>
      </div>
    </article>

   {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirmar Rejeição</h2>
            <p>Tem certeza que deseja rejeitar essa Ordem de Serviço?</p>
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

export default OSSolicitadasItem;
