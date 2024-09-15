import React, { useState } from 'react';
import EditForm from '../EditForm/EditForm'
import api from '../../../api/api';
import styles from './SecretariaCard.module.css';

function SecretariaCard({ id, name, phone, onDelete, onEdit }) {
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
      await api.delete(`/secretarias/${id}`); // Use o id recebido
      console.log("Secretaria removida");
      if (onDelete) {
        onDelete(id); // Chama onDelete para atualizar a lista, caso necessário
      }
      closeModal();
    } catch (error) {
      console.error("Erro ao deletar secretaria: ", error);
    }
  };

  const handleEdit = async (updatedData) => {
    try{
      await api.put(`/secretarias/${id}`);
      console.log('Objeto editado:', updatedData);
      if (onEdit){
        onEdit(updatedData)
      }
      setIsEditing(false);
      }catch (error) {
        console.error("Erro ao atualizar secretaria: ", error);
      }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const fields = [
    { name: 'name', label: 'Nome', type: 'text' },
    { name: 'phone', label: 'Telefone', type: 'text' },
  ];

  return (
  <>
    <article className={styles.card}>
      <img src="imagens/Secretaria.svg" alt={`${name}'s avatar`} className={styles.avatar} />
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.name}>{name}</h3>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.info}>
            <p>Fone: {phone}</p>
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
            <p>Tem certeza que deseja excluir a secretaria {name}?</p>
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
          initialValues={{ name, phone }}
          onSubmit={handleEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
}

export default SecretariaCard;
