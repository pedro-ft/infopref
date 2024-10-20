import React, { useState, useEffect } from 'react';
import api from '../../../api/api';
import EditForm from '../EditForm/EditForm'
import styles from './InfoInternetCard.module.css';

function TecnicoCard({ idInfoInternet, nomeRede, senha, ip, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/infointernet/${idInfoInternet}`);
      if (onDelete) {
        onDelete(idInfoInternet);
      }
      closeModal();
    } catch (error) {
      console.error("Erro ao deletar infoInternet: ", error);
    }
  };

  const handleEdit = async (updatedData) => {
    try {
      const payload = {
       nomeRede: updatedData.nomeRede,
       senha: updatedData.senha,
       ip: updatedData.ip,
      };
      await api.put(`/infointernet/${idInfoInternet}`, payload);
      if (onEdit) {
        onEdit(null);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar infointernet: ", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const fields = [
    { name: 'nomeRede', label: 'Nome da Rede', type: 'text' },
    { name: 'senha', label: 'Senha', type: 'text' },
    { name: 'ip', label: 'IP', type: 'text' }
  ];

  return (
  <>
    <article className={styles.card}>
      <img src="imagens/Internet.svg" alt={`Internet avatar`} className={styles.avatar} />
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
            <button className={styles.editButton} aria-label="Edit" onClick={() => setIsEditing(true)}>
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
       {isEditing && (
        <EditForm
          fields={fields}
          initialValues={{ nomeRede, senha, ip }}
          onSubmit={(updatedData) => handleEdit({ ...updatedData, idInfoInternet })}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
}

export default TecnicoCard;