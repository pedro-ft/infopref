import React, { useState } from 'react';
import styles from './DepartamentoCard.module.css';
import EditForm from '../EditForm/EditForm'
import { Link } from 'react-router-dom';

function DepartamentoCard({ name, phone, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = (updatedData) => {
    setIsEditing(false);
    onEdit(updatedData); // Chama a função de edição passando os novos dados
    console.log('Objeto editado:', updatedData);
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
            <h3 className={styles.name}>Departamento de {name}</h3>
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.info}>
              <p>Fone: {phone}</p>
            </div>
            <div className={styles.cardSideSection}>
              <Link to="/equipamentos">
                <button className={styles.cardButton} aria-label="Equipamentos">Equipamentos</button>
              </Link>
              <Link to="/infoInternet">
                <button className={styles.cardButton} aria-label="Informações de Internet">Informações de Internet</button>
              </Link>
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
            <p>Tem certeza que deseja excluir o departamento {name}?</p>
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

export default DepartamentoCard;
